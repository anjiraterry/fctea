"use client";
import { useQuery } from "@tanstack/react-query";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePlaces(params: string = "") {
  return useQuery({
    queryKey: ["places", params],
    queryFn: () => fetcher(`/api/places${params ? `?${params}` : ""}`),
  });
}

export function useEvents(params: string = "") {
  return useQuery({
    queryKey: ["events", params],
    queryFn: () => fetcher(`/api/events${params ? `?${params}` : ""}`),
  });
}

export function useNews(params: string = "") {
  return useQuery({
    queryKey: ["news", params],
    queryFn: () => fetcher(`/api/news${params ? `?${params}` : ""}`),
  });
}

export function usePeople(params: string = "") {
  return useQuery({
    queryKey: ["people", params],
    queryFn: () => fetcher(`/api/people${params ? `?${params}` : ""}`),
  });
}

export function useBlog(params: string = "") {
  return useQuery({
    queryKey: ["blog", params],
    queryFn: () => fetcher(`/api/blog${params ? `?${params}` : ""}`),
  });
}

export function useBrands(params: string = "") {
  return useQuery({
    queryKey: ["brands", params],
    queryFn: () => fetcher(`/api/brands${params ? `?${params}` : ""}`),
  });
}
