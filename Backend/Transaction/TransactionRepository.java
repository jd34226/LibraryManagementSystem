package mgt.library.transaction.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import mgt.library.transaction.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, String> {
	@Query(value = "SELECT * FROM transaction WHERE due_date > :now AND return_date IS NULL ORDER BY due_date ASC LIMIT 10", nativeQuery = true)
	List<Transaction> findUpcomingTransactions(@Param("now") LocalDate now);

	@Query("SELECT t FROM Transaction t WHERE t.returnDate IS NULL AND t.dueDate < :today")
	List<Transaction> findOverdueTransactions(@Param("today") LocalDate today);


	@Query("SELECT t FROM Transaction t WHERE (:id IS NULL OR t.id = :id)")
	List<Transaction> findByOptionalId(@Param("id") String id);

    @Query("SELECT t.id FROM Transaction t ORDER BY t.id DESC LIMIT 1")
    String findLastTxId();

}
