import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from 'src/app/services/posts.service';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  loadPosts,
  loadPostSuccess,
  updatePost,
  updatePostSuccess,
} from './posts.action';
import { map, mergeMap, switchMap } from 'rxjs';
import { createAction } from '@ngrx/store';
import { request } from 'node:http';
import { Update } from '@ngrx/entity';
import { Post } from 'src/app/models/posts.model';

@Injectable()
export class PostsEffect {
  constructor(private action$: Actions, private postService: PostsService) {}

  loadPosts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loadPosts),
      mergeMap((action) => {
        return this.postService.getPost().pipe(
          map((posts) => {
            return loadPostSuccess({ posts });
          })
        );
      })
    );
  });

  addPost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postService.addPost(action.post).pipe(
          map((data) => {
            const post = { ...action.post, id: data.name };
            return addPostSuccess({ post });
          })
        );
      })
    );
  });

  updatePost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        return this.postService.updatePost(action.post).pipe(
          map((data) => {
           return updatePostSuccess({ post: action.post})
          })
        );
      })
    );
  });



  deletePost$ = createEffect(() => {
    return this.action$.pipe(
    ofType(deletePost),
      switchMap((action) => {
        return this.postService.deletePost(action.id).pipe(
          map((data) => {
           return deletePostSuccess({ id: action.id})
          })
        );
      })
    );
  });
}
