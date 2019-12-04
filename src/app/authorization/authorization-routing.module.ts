import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateComponent } from "./activate/activate.component";
import { ActiveUserComponent } from "./active-user/active-user.component";
import { ActivationComponent } from "./activation/activation.component";
import { LoginComponent } from "./login/login.component";
import { ForgetComponent } from "./forget/forget.component";
import { RestpassComponent } from "./restpass/restpass.component";
import { LogoutComponent } from "./logout/logout.component";
import { UpgradeComponent } from './upgrade/upgrade.component';
import { UpgradationComponent } from './upgradation/upgradation.component';
import { VerifyTokenComponent } from './verify-token/verify-token.component';


const routes: Routes = [
  { path: 'activate', component: ActivateComponent },
  { path: 'active-user', component: ActiveUserComponent },
  { path: 'activation', component: ActivationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forget', component: ForgetComponent },
  { path: 'reset/:id', component: RestpassComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'upgrade', component: UpgradeComponent },
  { path: 'upgradation', component: UpgradationComponent },
  { path: 'verify-token/:id', component: VerifyTokenComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule { }
