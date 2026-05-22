package mgt.library.book.model;


import jakarta.persistence.*;

@Entity
public class Book {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

	@Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "author", nullable = false, length = 255)
    private String author;

    @Column(name = "genre", length = 100)
    private String genre;

    @Column(name = "year")
    private Integer year;

    @Column(name = "availability")
    private Boolean availability;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }

    public Boolean getAvailability() {
  		return availability;
  	}
  	public void setAvailability(Boolean availability) {
  		this.availability = availability;
  	}
}
