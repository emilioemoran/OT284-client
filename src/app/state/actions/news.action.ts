import { createAction,props } from "@ngrx/store";
import { newData } from "src/app/features/pages/news/models/newM";

export const NEWS_LOAD='[News List] Load News';
export const NEWS_LOADED= '[News List] Loaded News';
export const NEWS_LOAD_FAILURE='[News List] Not Loaded News';

export const NEW_DELETE_ALERT='[News List] Alert Delete New';
export const NEW_NOT_DELETE='[News List] Not Deleted New'
export const NEW_DELETE='[News List] Delete New';
export const NEW_DELETED='[News List] Deleted New';
export const NEW_DELETE_FAILURE='[News List] Error delete New';

export const NEW_CREATE='[News Form] Create New';
export const NEW_CREATED='[News Form] Created New';
export const NEW_CREATE_FAILURE='[News Form] Error Create New';

export const NEW_EDIT='[News Form] Edit New';
export const NEW_EDITED='[News Form] Edited New';
export const NEW_EDIT_FAILURE='[News Form] Error Edite New';

export const loadNews=createAction(
    NEWS_LOAD
);

export const loadedNews=createAction(
    NEWS_LOADED,
    props<{news:newData[]}>()
)

export const errorLoadedNews=createAction(
    NEWS_LOAD_FAILURE,
    props<{message:string}>()
)

export const alertDelete=createAction(
    NEW_DELETE_ALERT,
    props<{newToDelete:newData}>()
)

export const notDelete=createAction(
    NEW_NOT_DELETE
)

export const deleteNew=createAction(
    NEW_DELETE,
    props<{newToDelete:newData}>()
)

export const deletedNew=createAction(
    NEW_DELETED,
    props<{newDeleted:newData}>()
)

export const errorDeleteNew=createAction(
    NEW_DELETE_FAILURE
)

export const createNew=createAction(
    NEW_CREATE
)

export const createdNew=createAction(
    NEW_CREATED,
    props<{news:newData[]}>()
)

export const errorCreateNew=createAction(
    NEW_CREATE_FAILURE
)

export const editNew=createAction(
    NEW_EDIT
)

export const editedNew=createAction(
    NEW_EDITED,
    props<{news:newData[]}>()
)

export const errorEditedNew=createAction(
    NEW_EDIT_FAILURE
)