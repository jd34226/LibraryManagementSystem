package mgt.library.transaction.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import mgt.library.transaction.model.Transaction;
import mgt.library.transaction.service.TransactionService;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

	@Autowired
	private TransactionService transactionService;

	@PostMapping
	public Transaction addTransaction(@RequestBody Transaction transaction) {
		return transactionService.addTransaction(transaction);
	}

	@PutMapping("/{id}")
	public Transaction updateTransaction(@PathVariable("id") String id, @RequestBody Transaction transaction) {
		return transactionService.updateTransaction(id, transaction);

	}

	@DeleteMapping("/{id}")
	public void deleteTransaction(@PathVariable("id") String id) {
		transactionService.deleteTransaction(id);

	}

	@GetMapping("/next10")
	public List<Transaction> get10Transaction() {
		return transactionService.get10Transaction();
	}

	@GetMapping
	public List<Transaction> getTransactions(@RequestParam(name = "id", required = false) String id) {
	    return transactionService.getTransactions(id != null && !id.trim().isEmpty() ? id : null);
	}


	@GetMapping("/overdue")
    public ResponseEntity<List<Transaction>> getOverdueTransactions() {
        List<Transaction> overdue = transactionService.getOverdueTransactions();
        return ResponseEntity.ok(overdue);
    }



}
