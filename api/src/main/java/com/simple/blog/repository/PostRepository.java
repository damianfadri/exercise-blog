package com.simple.blog.repository;

import com.simple.blog.entity.Post;
import com.simple.blog.projection.PostProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
    Page<PostProjection> findAllProjectedBy(Pageable paging);

    Page<PostProjection> findByTitleContainingOrContentContaining(
            String title, String content, Pageable paging);
}
