package com.simple.blog.repository;

import com.simple.blog.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID> {
    // Intentionally left blank
}
