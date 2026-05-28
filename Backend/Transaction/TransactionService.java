package mgt.library.transaction.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mgt.library.transaction.model.Transaction;
import mgt.library.transaction.model.TransactionStatus;
import mgt.library.transaction.repository.TransactionRepository;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public String generateNextTxId() {
        String lastId = transactionRepository.findLastTxId();
        int nextNumber = 1;

        if (lastId != null && lastId.startsWith("TX")) {
            try {
                nextNumber = Integer.parseInt(lastId.substring(2)) + 1;
            } catch (NumberFormatException ignored) {}
        }

        return String.format("TX%04d", nextNumber); // TX0043
    }


    // This demo uses simple logic for status updates; consider event/audit logging in production.
    public Transaction addTransaction(Transaction transaction) {
        transaction.setId(generateNextTxId());
        if (transaction.getReturnDate() == null) {
            transaction.setStatus(TransactionStatus.OPEN);
        } else {
            transaction.setStatus(TransactionStatus.CLOSED);
        }

        return transactionRepository.save(transaction);
    }



    public Transaction updateTransaction(String id, Transaction updatedTransaction) {
        Transaction existing = transactionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Record not found"));

        existing.setBorrowDate(updatedTransaction.getBorrowDate());
        existing.setDueDate(updatedTransaction.getDueDate());
        existing.setReturnDate(updatedTransaction.getReturnDate());
        existing.setBook(updatedTransaction.getBook());
        existing.setMember(updatedTransaction.getMember());
        if (updatedTransaction.getReturnDate() != null) {
            existing.setStatus(TransactionStatus.CLOSED);
        } else {
            existing.setStatus(updatedTransaction.getStatus());
        }

        return transactionRepository.save(existing);
    }


    public void deleteTransaction(String id) {
        if (!transactionRepository.existsById(id)) {
            throw new RuntimeException("Record not found");
        }
        transactionRepository.deleteById(id);
    }

    public List<Transaction> get10Transaction() {
        LocalDate now = LocalDate.now();
        return transactionRepository.findUpcomingTransactions(now);
    }

    public List<Transaction> getOverdueTransactions() {
        LocalDate today = LocalDate.now();
        return transactionRepository.findOverdueTransactions(today);
    }


    public List<Transaction> getTransactions(String id) {
        return transactionRepository.findByOptionalId(id);
    }


}
