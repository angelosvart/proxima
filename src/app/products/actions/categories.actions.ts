import { createAction, props } from "@ngrx/store";
import { Category } from "../models/Category";

export const getCategories = createAction("[CATEGORIES] Get categories");

export const getCategoriesSuccess = createAction(
	"[CATEGORIES] Get categories Success",
	props<{ categories: Category[] }>()
);

export const getCategoriesFailure = createAction(
	"[CATEGORIES] Get categories failure",
	props<{ payload: any }>()
);
