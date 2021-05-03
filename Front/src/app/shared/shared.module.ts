import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule,MatSelectModule,MatInputModule,MatDividerModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule,
  MatBadgeModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatCardModule,
    MatListModule,MatFormFieldModule,MatSelectModule,MatInputModule,MatBadgeModule,MatSidenavModule,MatGridListModule,MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule,
    HighchartsChartModule,
    ChartsModule,FormsModule,ReactiveFormsModule,MatDialogModule,MatSortModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MatCardModule,
    MatFormFieldModule,MatSelectModule,MatInputModule,MatBadgeModule,MatSidenavModule,MatGridListModule,MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,

  ],
  providers:[ThemeService]
})
export class SharedModule { }
