import { Post } from 'src/app/models/posts.model';
import { Action, createReducer, on } from '@ngrx/store';
import { initialState, PostsState } from './posts.state';
import { addPost, deletePost, updatePost } from './posts.action';

const _postReducer = createReducer(
  initialState,
  on(addPost, (state, action) => {
    debugger;

    let post = { ...action.post };

    post.id = (state.posts.length + 1).toString();

    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),

  on(updatePost, (state, action) => {
    const updatedPosts = state.posts.map((post) => {
      return action.post.id === post.id ? action.post : post;
    });
    return {
      ...state,
      posts: updatedPosts,
    };
  }),

  on(deletePost, (state, { id }) => {
    const updatedPost = state.posts.filter((post) => {
      return post.id != id;
    });
    return {
      ...state,
      posts: updatedPost,
    };
  })
);

export function postsReducer(state: PostsState | undefined, action: Action) {
  return _postReducer(state, action);
}
