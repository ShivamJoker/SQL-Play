import {useEffect, useState} from 'react';
import Wretch from 'wretch';
import {LessonItem} from '~/types/lesson-type';
const HOST = 'https://assets.sqlplay.net';

const wretch = Wretch(`${HOST}`);

type HookState<DataT> = {
  error: string | null;
  isLoading: boolean;
  data?: DataT;
};
export const useGetLessonsList = () => {
  const [state, setState] = useState<HookState<LessonItem[]>>({
    error: null,
    isLoading: true,
  });

  const fetch = async () => {
    try {
      const res = await wretch.get('/learn/lessons.json').json();
      setState({...state, data: res as LessonItem[]});
    } catch (error) {
      console.log(error);
      setState(prv => ({...prv, error: error?.message}));
    } finally {
      setState(prv => ({...prv, isLoading: false}));
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  return {...state};
};

export const useGetLessonMd = (path: string) => {
  const [state, setState] = useState<HookState<string>>({
    error: null,
    isLoading: true,
  });

  const fetch = async () => {
    try {
      console.log(path);
      const res = await wretch.get(`/${path}`).text();
      const md = res.split('---\n')[2];
      console.log(md);
      setState({...state, data: md});
    } catch (error) {
      console.log(error);
      setState(prv => ({...prv, error: error?.message}));
    } finally {
      setState(prv => ({...prv, isLoading: false}));
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  return {...state};
};
