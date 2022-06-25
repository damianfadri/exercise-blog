package com.simple.blog.projection;

import com.simple.blog.entity.Comment;
import org.springframework.data.rest.core.config.Projection;

import java.util.UUID;

@Projection(name="CommentProjection", types={ Comment.class })
public interface CommentProjection {
    UUID getId();

    String getAuthor();

    String getContent();

    String getCreateDate();

    String getUpdateDate();
}
