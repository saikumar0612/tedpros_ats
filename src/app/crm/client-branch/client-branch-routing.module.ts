import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { BranchesComponent } from './branches/branches.component';
import { EditBranchComponent } from './edit-branch/edit-branch.component';
import { ViewBranchComponent } from './view-branch/view-branch.component';
import { LayoutComponent } from '../../shared/layout/layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            { path: 'add-branch/:id', component: AddBranchComponent },
            { path: 'edit-branch/:id', component: EditBranchComponent },
            { path: 'view-branch/:id', component: ViewBranchComponent },
            { path: '', redirectTo: 'client-branch', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientBranchRoutingModule { }
