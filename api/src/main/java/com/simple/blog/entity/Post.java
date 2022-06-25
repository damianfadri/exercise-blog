package com.simple.blog.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table
public class Post extends BaseEntity {

    @Column(name="title", nullable=false, columnDefinition="VARCHAR(60)")
    private String title;

    @Column(name="content", nullable=false, columnDefinition="TEXT")
    private String content;

    @Column(name="author", columnDefinition="VARCHAR(60)")
    private String author;

    @OneToMany(mappedBy="post", cascade=CascadeType.REMOVE)
    private List<Comment> comments;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
