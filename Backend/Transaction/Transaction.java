package mgt.library.transaction.model;

import jakarta.persistence.*;
import mgt.library.book.model.Book;
import mgt.library.member.model.Member;

import java.time.LocalDate;

@Entity
@Table(name = "transaction")
public class Transaction {

	@Id
	//@GeneratedValue(strategy = GenerationType.IDENTITY)
	// NOTE: For the demo we use a simple String id. In production prefer DB-generated ids or UUIDs and avoid sequential IDs that can be enumerated.
	private String id;
	@Column(name = "borrow_date")
	private LocalDate borrowDate;
	@Column(name = "due_date")
	private LocalDate dueDate;
	@Column(name = "return_date")
	private LocalDate returnDate;
	@Enumerated(EnumType.STRING)
	private TransactionStatus status = TransactionStatus.OPEN;
	@ManyToOne
	@JoinColumn(name = "book_id")
	private Book book;
	@ManyToOne
	@JoinColumn(name = "mem_id")
	private Member member; // Hide sensitive member fields (password) when serializing transactions. Current code is for simplicity.


	public String getId() {
		return id;
	}

	public void setId(String string) {
		this.id = string;
	}

	public LocalDate getBorrowDate() {
		return borrowDate;
	}

	public void setBorrowDate(LocalDate borrowDate) {
		this.borrowDate = borrowDate;
	}

	public LocalDate getDueDate() {
		return dueDate;
	}

	public void setDueDate(LocalDate dueDate) {
		this.dueDate = dueDate;
	}

	public LocalDate getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(LocalDate returnDate) {
		this.returnDate = returnDate;
	}

	public TransactionStatus getStatus() {
		return status;
	}

	public void setStatus(TransactionStatus status) {
		this.status = status;
	}

	public Book getBook() {
	    return book;
	}

	public void setBook(Book book) {
	    this.book = book;
	}

	public Member getMember() {
	    return member;
	}

	public void setMember(Member member) {
	    this.member = member;
	}

}
