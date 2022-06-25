package com.simple.blog.controller;

import com.simple.blog.entity.Comment;
import com.simple.blog.entity.ErrorMessage;
import com.simple.blog.entity.Post;
import com.simple.blog.projection.CommentProjection;
import com.simple.blog.projection.PostProjection;
import com.simple.blog.repository.CommentRepository;
import com.simple.blog.repository.PostRepository;
import com.simple.blog.service.ProjectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.util.Optional;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ProjectionService projectionService;

    @PostMapping
    public @ResponseBody ResponseEntity<PostProjection> createPost(
            @RequestBody Post unsavedPost) {

        validatePost(unsavedPost);

        Post newPost = new Post();
        newPost.setTitle(unsavedPost.getTitle());
        newPost.setContent(unsavedPost.getContent());
        newPost.setAuthor(unsavedPost.getAuthor());

        Post savedPost = this.postRepository.save(newPost);

        return ResponseEntity.ok(
                this.projectionService.createProjection(
                        PostProjection.class, savedPost));
    }

    @GetMapping("/{id}")
    public @ResponseBody ResponseEntity<PostProjection> getSpecificPost(
            @PathVariable(value="id", required=true) String postId) {

        UUID id = UUID.fromString(postId);
        Optional<Post> optionalPost = this.postRepository.findById(id);

        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();

            return ResponseEntity.ok(
                    this.projectionService.createProjection(
                            PostProjection.class, post));
        }

        throw new IllegalArgumentException(
                String.format("Post with id %s cannot be found.", id));
    }

    @GetMapping
    public @ResponseBody ResponseEntity<Page<PostProjection>> getPosts(
            @RequestParam(defaultValue="0") int page,
            @RequestParam(defaultValue="5") int size,
            @RequestParam(defaultValue="") String keyword,
            @RequestParam(defaultValue="createDate") String sortField,
            @RequestParam(defaultValue="desc") String sortOrder) {

        if (!StringUtils.hasText(sortField)) {
            sortField = "createDate";
        }

        Sort sort = Sort.by(sortField);
        if (sortOrder.equals("asc")) {
            sort = sort.ascending();
        } else {
            sort = sort.descending();
        }

        Pageable paging = PageRequest.of(page, size, sort);

        Page<PostProjection> posts = null;
        if (!StringUtils.hasText(keyword)) {
            posts = postRepository.findAllProjectedBy(paging);
        } else {
            posts = postRepository.findByTitleContainingOrContentContaining(
                    keyword, keyword, paging);
        }

        return ResponseEntity.ok(posts);
    }

    @PutMapping("/{id}")
    public @ResponseBody ResponseEntity<PostProjection> updatePost(
            @PathVariable(value="id", required=true) String postId,
            @RequestBody Post unsavedPost) {

        validatePost(unsavedPost);

        UUID id = UUID.fromString(postId);
        Optional<Post> optionalPost = this.postRepository.findById(id);

        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.setTitle(unsavedPost.getTitle());
            post.setContent(unsavedPost.getContent());
            post.setAuthor(unsavedPost.getAuthor());

            Post savedPost = this.postRepository.save(post);

            return ResponseEntity.ok(
                    this.projectionService.createProjection(
                            PostProjection.class, savedPost));
        }

        throw new IllegalArgumentException(
                String.format("Post with id %s cannot be found.", id));
    }

    @DeleteMapping("/{id}")
    public @ResponseBody void deletePost(
            @PathVariable(value="id", required=true) String postId) {

        UUID id = UUID.fromString(postId);
        Optional<Post> optionalPost = this.postRepository.findById(id);

        if (optionalPost.isPresent()) {
            this.postRepository.delete(optionalPost.get());

        } else {
            throw new IllegalArgumentException(
                    String.format("Post with id %s cannot be found.", id));
        }
    }

    @PostMapping("/{id}/comment")
    public @ResponseBody ResponseEntity<CommentProjection> addComment(
            @PathVariable(value="id", required=true) String postId,
            @RequestBody Comment unsavedComment) {
        validateComment(unsavedComment);

        UUID id = UUID.fromString(postId);
        Optional<Post> optionalPost = this.postRepository.findById(id);

        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();

            Comment comment = new Comment();
            comment.setAuthor(unsavedComment.getAuthor());
            comment.setContent(unsavedComment.getContent());
            comment.setPost(post);

            Comment savedComment = this.commentRepository.save(comment);

            return ResponseEntity.ok(
                    this.projectionService.createProjection(
                            CommentProjection.class, savedComment));
        }

        throw new IllegalArgumentException(
                String.format("Post with id %s cannot be found.", id));
    }

    @ExceptionHandler({ IllegalArgumentException.class })
    public ResponseEntity<ErrorMessage> handleIllegalArgumentExceptions(
            IllegalArgumentException ex, WebRequest request) {

        ErrorMessage message = new ErrorMessage(ex.getMessage(),
                HttpStatus.BAD_REQUEST.value());

        return ResponseEntity.badRequest().body(message);
    }

    private void validatePost(Post post) {
        if (!StringUtils.hasText(post.getTitle())) {
            throw new IllegalArgumentException("Title cannot be empty.");
        }

        if (!StringUtils.hasText(post.getContent())) {
            throw new IllegalArgumentException("Content cannot be empty.");
        }

        if (post.getTitle().length() > 60) {
            throw new IllegalArgumentException("Title cannot be longer than 60 characters.");
        }

        if (post.getContent().length() > 10000) {
            throw new IllegalArgumentException("Content cannot be longer than 10000 characters.");
        }

        if (StringUtils.hasText(post.getAuthor())) {
            if (post.getAuthor().length() > 60) {
                throw new IllegalArgumentException("Author cannot be longer than 60 characters.");
            }
        }
    }

    private void validateComment(Comment comment) {
        if (!StringUtils.hasText(comment.getContent())) {
            throw new IllegalArgumentException("Content cannot be empty.");
        }

        if (comment.getContent().length() > 10000) {
            throw new IllegalArgumentException("Content cannot be longer than 10000 characters.");
        }

        if (StringUtils.hasText(comment.getAuthor())) {
            if (comment.getAuthor().length() > 60) {
                throw new IllegalArgumentException("Author cannot be longer than 60 characters.");
            }
        }
    }
}
