import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CardMemoryGameComponent } from "./cards/card-memory-game/card-memory-game.component";
import { HomeComponent } from "./home/home.component";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'matchinggame', component: CardMemoryGameComponent },
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
