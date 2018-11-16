import api from '../api';
import constants from '../constants';

const {
  POST_ARTICLE, FETCH_ARTICLE, UPDATE_ARTICLE, FETCH_ALL_ARTICLES,
} = constants;

export const fetchArticle = slug => ({
  type: FETCH_ARTICLE,
  payload: api({
    method: 'GET',
    url: `/articles/${slug}`,
  }),
});

export const fetchAllArticles = page => ({
  type: FETCH_ALL_ARTICLES,
  payload: api({
    method: 'GET',
    url: '/articles/',
    data: { page },
  }),
});

export const postArticle = article => ({
  type: POST_ARTICLE,
  payload: api({
    method: 'POST',
    url: '/articles/',
    data: {
      article: { ...article },
    },
  }),
});

export const updateArticle = article => ({
  type: UPDATE_ARTICLE,
  payload: api({
    method: 'PUT',
    url: `/articles/${article.slug}`,
    data: {
      article: { ...article },
    },
  }),
});