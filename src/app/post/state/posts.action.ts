import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';

export const ADD_POST_ACTION = '[post page] add post';
export const ADD_POST_SUCCESS = '[post page] add post success';
export const UPDATE_POST_ACTION = '[post page] update post';
export const UPDATE_POST_SUCCESS = '[post page] update post success';
export const DELETE_POST_ACTION = '[post page] delete post';
export const DELETE_POST_SUCCESS = '[post page] delete post success';
export const LOAD_POST = '[post page] load posts';
export const LOAD_POST_SUCCESS = '[post page] load post success';

export const addPost = createAction(ADD_POST_ACTION, props<{ post: Post }>());

export const addPostSuccess = createAction(
  ADD_POST_SUCCESS,
  props<{ post: Post }>()
);

export const updatePost = createAction(
  UPDATE_POST_ACTION,
  props<{ post: Post }>()
);

export const updatePostSuccess = createAction(
  UPDATE_POST_SUCCESS,
  props<{ post: Post }>()
);

export const deletePost = createAction(
  DELETE_POST_ACTION,
  props<{ id: string }>()
);

export const deletePostSuccess = createAction(
  DELETE_POST_SUCCESS,
  props<{ id: string }>()
);

export const loadPosts = createAction(LOAD_POST);
export const loadPostSuccess = createAction(
  LOAD_POST_SUCCESS,
  props<{ posts: Post[] }>()
);
