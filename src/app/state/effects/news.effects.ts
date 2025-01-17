import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import {Actions, createEffect, ofType} from "@ngrx/effects"
import { of } from "rxjs";
import { mergeMap, map, catchError, tap } from "rxjs/operators";
import { NewsService } from "src/app/features/pages/news/news.service";
import { MatAlertErrorComponent } from "src/app/shared/components/mat-alert-error/mat-alert-error.component";
import * as newsActions from '../actions/news.action';

@Injectable()
export class NewsEffects{

    loadNews$= createEffect(()=>this.actions$.pipe(
        ofType(newsActions.loadNews),
        mergeMap(()=>this.srcNews.verNews()
        .pipe(
            map(news=>newsActions.loadedNews({news})),
            catchError((error:HttpErrorResponse) => of(newsActions.errorLoadedNews(error))
            )
        )
        )
    )
    )

    errorNews$=createEffect(()=>this.actions$.pipe(
        ofType(newsActions.errorLoadedNews),
        tap((action)=>this.dialog.open(MatAlertErrorComponent,{
            data:{text:'Error al cargar novedades', message: action.message},
        }))
    ),
        {dispatch:false}
    )

    searchNews$=createEffect(()=>this.actions$.pipe(
        ofType(newsActions.searchNew),
        mergeMap((action)=>this.srcNews.buscarNews(action.text)
        .pipe(
            map((news)=>newsActions.searchNewSuccess(news)),
            catchError((error:HttpErrorResponse)=>of(newsActions.searchNewFailure(error)))
        ))
    ))

    searchNewsFailure$=createEffect(()=>this.actions$.pipe(
        ofType(newsActions.searchNewFailure),
        tap((action)=>this.dialog.open(MatAlertErrorComponent,{
            data:{text:"Error al buscar novedad", message:action.message},
        }))
    ))

    deleteNew$=createEffect(()=>this.actions$.pipe(
        ofType(newsActions.deleteNew),
        mergeMap((action)=>this.srcNews.deleteNew(action.newToDelete.id)
        .pipe(
            map((response)=>newsActions.deletedNew(response)),
            catchError((error:HttpErrorResponse) => of(newsActions.errorDeleteNew(error)))
        ))
    )) 

    errorDeleteNew$=createEffect(()=>this.actions$.pipe(
        ofType(newsActions.errorDeleteNew),
        tap((action)=>this.dialog.open(MatAlertErrorComponent,{
            data:{text:"Error al eliminar novedad", message:action.message},
        }))
    ))

    //Effects for receive new:
    getNew$=createEffect(()=>this.actions$.pipe(
        ofType(newsActions.getNew),
        mergeMap(action=>this.srcNews.getNewModel(action.id)
        .pipe(
            map(newToEdit=>newsActions.receivedNew({newToEdit})),
            catchError(()=>of(newsActions.errorReceivedNew))
        )
        )
    ))
    
    errorReceived$=createEffect(()=>this.actions$.pipe(
        ofType(newsActions.errorReceivedNew),
        tap(()=>this.dialog.open(MatAlertErrorComponent,{
            data:{text:'Error', message: 'Error de conexión al modificar novedad'},
        }))
    ),
        {dispatch:false}
    )  

    //Effect for create new:
    createNew$=createEffect(()=>this.actions$.pipe(
        ofType(newsActions.createNew),
        mergeMap(action=>this.srcNews.nuevaNew(action.newToCreate)
        .pipe(
            map((response)=>newsActions.createdNew({response})),
            catchError((error:HttpErrorResponse) => of(newsActions.errorCreateNew(error)))
        ))
    ))

    errorCreateNew$=createEffect(()=>this.actions$.pipe(
        ofType(newsActions.errorCreateNew),
        tap((action)=>this.dialog.open(MatAlertErrorComponent,{
            data:{text:'Error al crear novedad', message: action.message},
        }))
    ),
        {dispatch:false}
    )  

    //Effect for edit new:
    editNew$=createEffect(()=>this.actions$.pipe(
        ofType(newsActions.editNew),
        mergeMap(action=>this.srcNews.modificarNew(action.newToEdit)
        .pipe(
            map((response)=>newsActions.editedNew({response}),newsActions.loadNews),
            catchError((error:HttpErrorResponse)=>of(newsActions.errorEditedNew(error)))
        )))
    )

    errorEditedNew$=createEffect(()=>this.actions$.pipe(
        ofType(newsActions.errorEditedNew),
        tap((action)=>this.dialog.open(MatAlertErrorComponent,{
            data:{text:'Error al editar novedad', message: action.message},
        }))
    ),
        {dispatch:false}
    )  

    constructor(
        private actions$:Actions,
        private srcNews:NewsService,
        public dialog: MatDialog,
        public ruta:Router
    ){}
}