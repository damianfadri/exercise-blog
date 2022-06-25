package com.simple.blog.entity;

import javax.persistence.*;

@Entity
@Table
public class Comment extends BaseEntity {
    @Column(name="author", columnDefinition="VARCHAR(60)")
    private String author;

    @Column(name="content", nullable=false, columnDefinition="TEXT")
    private String content;

    @ManyToOne
    @JoinColumn(name="post_id", nullable=false)
    private Post post;

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}
