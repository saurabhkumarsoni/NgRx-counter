import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.state';

export const POST_STATE_NAME = 'posts'

const getPostState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const getPosts = createSelector(
  getPostState,
  (state: PostsState) => state.posts
);

export const getPostById = createSelector(
  getPostState,
  (state: PostsState, props: any) => {
    const post =  state.posts.find(post => post.id === props.id);
    return post
  }
);
