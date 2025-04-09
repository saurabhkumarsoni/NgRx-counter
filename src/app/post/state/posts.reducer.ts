import { Post } from 'src/app/models/posts.model';
import { Action, createReducer, on } from '@ngrx/store';
import { initialState, PostsState } from './posts.state';
import { addPostSuccess, deletePost, deletePostSuccess, loadPostSuccess, updatePost, updatePostSuccess } from './posts.action';

const _postReducer = createReducer(
  initialState,
  on(addPostSuccess, (state, action) => {
    debugger;
    let post = { ...action.post };

    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),

  on(updatePostSuccess, (state, action) => {
    const updatedPosts = state.posts.map((post) => {
      return action.post.id === post.id ? action.post : post;
    });
    return {
      ...state,
      posts: updatedPosts,
    };
  }),

  on(deletePostSuccess, (state, { id }) => {
    const updatedPost = state.posts.filter((post) => {
      return post.id != id;
    });
    return {
      ...state,
      posts: updatedPost,
    };
  }),
  on(loadPostSuccess,(state, action) =>{
    return {
      ...state,
      posts: action.posts
    }
  })
);

export function postsReducer(state: PostsState | undefined, action: Action) {
  return _postReducer(state, action);
}
