package com.simple.blog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProjectionService {

    @Autowired
    private ProjectionFactory projectionFactory;

    public <P, E> P createProjection(Class<P> projectionClass, E entity) {
        return this.projectionFactory.createProjection(projectionClass, entity);
    }

    public <P, E> Iterable<P> createProjections(Class<P> projectionClass, List<E> entities) {
        return entities.stream()
                .map(entity -> createProjection(projectionClass, entity))
                .collect(Collectors.toList());
    }
}
