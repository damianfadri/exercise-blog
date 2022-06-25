package com.simple.blog.projection;

import com.simple.blog.entity.Post;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;
import java.util.UUID;

@Projection(name="PostProjection", types={ Post.class })
public interface PostProjection {
    UUID getId();

    String getTitle();

    String getContent();

    String getAuthor();

    String getCreateDate();

    String getUpdateDate();

    List<CommentProjection> getComments();
}
