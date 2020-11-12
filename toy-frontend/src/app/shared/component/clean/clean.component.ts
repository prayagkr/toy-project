import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import * as moment from 'moment';

import { AlertDialog } from '../report/report.component';
import { MatDialog } from '@angular/material';

import { GetReportsService } from '../get-reports.service';

@Component({
  selector: 'app-clean',
  templateUrl: './clean.component.html',
  styleUrls: ['./clean.component.css'],
})
export class CleanComponent implements OnInit {
  appProjectsList = [];
  selectedProject = '';
  selectedModule = '';
  appModuleList = [];
  appSubsetList = [];
  isModuleDisabled = true;
  isDateFilter = true;
  timeZoneOffset: any = new Date().getTimezoneOffset() * 60000;
  loading = false;
  selectedDate: any;
  inputDate = '';
  resp = null;

  selectFormControl = new FormControl();
  searchTextboxControl = new FormControl();
  selectedValues = [];
  data: string[] = ['Amit', 'Amit Kumar', 'Amit B', 'Bikash', 'Bikash', 'B3', 'C1', 'C2', 'C3'];

  filteredOptions: Observable<any[]>;

  constructor(private getReportsData: GetReportsService, public dialog: MatDialog) {
    this.selectedDate = { startDate: null, endDate: null };
    this.appSubsetList = ['do not include/', 'from date range/', 'ALL/'];
  }

  ngOnInit() {
    this.loading = true;

    this.getReportsData.getProjects().subscribe((dataApp) => {
      this.appProjectsList = dataApp;
      this.loading = false;
    });

    this.setFilterItems();
  }

  getAppModules() {
    this.loading = true;
    this.getReportsData.getModules(this.selectedProject.slice(0, -1)).subscribe((mdata) => {
      this.appModuleList = mdata;
      if (mdata.length > 1) {
        this.appModuleList.unshift({ name: 'ALL/' });
      }
      setTimeout(() => {
        this.setFilterItems();
      }, 100);
      this.isModuleDisabled = false;
      this.loading = false;
    });
  }

  unableDate() {
    this.isDateFilter = false;
  }

  setFilterItems() {
    this.filteredOptions = this.searchTextboxControl.valueChanges.pipe(
      startWith<string>(''),
      map((name) => this.filterItems(name))
    );
  }

  openDialog(type, msg): void {
    const dialogRef = this.dialog.open(AlertDialog, {
      width: '350px',
      data: { type: type, msg: msg },
    });
  }

  onDateSelect() {
    if (this.inputDate.length > 2 && this.inputDate.split('-')[0].toLowerCase() === 't') {
      const d = new Date();
      d.setMonth(d.getMonth() - 1);
      this.selectedDate.endDate = d.toLocaleDateString();
      d.setDate(d.getDate() - parseInt(this.inputDate.split('-')[1], 10));
      this.selectedDate.startDate = d.toLocaleDateString();
      this.inputDate = this.selectedDate.startDate + ' - ' + this.selectedDate.endDate;
    }
    if (this.inputDate.length > 16 && !this.inputDate.split(' - ')[2]) {
      this.selectedDate.endDate = this.inputDate.split(' - ')[1];
      this.selectedDate.startDate = this.inputDate.split(' - ')[0];
      this.inputDate = this.selectedDate.startDate + ' - ' + this.selectedDate.endDate;
    }
  }

  cleanReport() {
    this.onDateSelect();
    const project = this.selectedProject.slice(0, -1);
    const moduleCode = this.selectedModule.slice(0, -1);
    const sDate = moment(this.selectedDate.startDate).format('YYYYMMDD');
    const eDate = moment(this.selectedDate.endDate).format('YYYYMMDD');
    let isValidDate =
      (!sDate.startsWith('Invalid') || !eDate.startsWith('Invalid')) &&
      this.inputDate.length > 16 &&
      this.inputDate.length < 24;
    const d = new Date();
    d.setMonth(d.getMonth() - 1);
    const pastMonth = Date.parse(d.toLocaleDateString());
    if (Date.parse(this.selectedDate.startDate) > pastMonth || Date.parse(this.selectedDate.endDate) > pastMonth) {
      isValidDate = false;
    }
    this.resp = null;

    if (isValidDate) {
      this.loading = true;
      const promise = this.getReportsData.cleanReport(project, moduleCode, sDate, eDate).toPromise();
      promise.then(
        (data) => {
          this.resp = data;
          this.loading = false;
          if (data.length === 0) {
            this.openDialog('WRA', 'Report Clean-Up Complete');
          } else {
            if (data.toString().startsWith('Error:')) {
              this.openDialog('WRA', 'Report Clean-Up Failed');
            } else {
              this.openDialog(
                'WRA',
                'Report Clean-Up from ' + this.selectedDate.startDate + ' to ' + this.selectedDate.endDate + ' Complete'
              );
            }
          }
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      );
    } else {
      this.openDialog('WRA', 'Invalid Date Range Format - Use MM/DD/YYYY - MM/DD/YYYY');
    }
  }

  /**
   * Used to filter data based on search input
   */
  private filterItems(name: string): String[] {
    const filterValue = name.toLowerCase();
    // Set selected values to retain the selected checkbox state
    this.setSelectedValues();
    this.selectFormControl.patchValue(this.selectedValues);
    const filteredList = this.appModuleList.filter(
      (option: any) => option.name.toLowerCase().indexOf(filterValue) === 0
    );
    return filteredList;
  }

  /**
   * Remove from selected values based on uncheck
   */
  selectionChange(event: any) {
    if (event.isUserInput && event.source.selected === false) {
      const index = this.selectedValues.indexOf(event.source.value);
      this.selectedValues.splice(index, 1);
    }
  }

  openedChange(e: any) {
    this.searchTextboxControl.patchValue('');
  }

  /**
   * Clearing search textbox value
   */
  clearSearch(event: any) {
    event.stopPropagation();
    this.searchTextboxControl.patchValue('');
  }

  /**
   * Set selected values to retain the state
   */
  setSelectedValues() {
    console.log('selectFormControl', this.selectFormControl.value);
    if (this.selectFormControl.value && this.selectFormControl.value.length > 0) {
      this.selectFormControl.value.forEach((e: any) => {
        if (this.selectedValues.indexOf(e) === -1) {
          this.selectedValues.push(e);
        }
      });
    }
  }

  /**
   *
   * @param item Remove item through the Chip
   */

  remove(item: any): void {
    const index = this.selectedValues.indexOf(item);

    if (index >= 0) {
      this.selectedValues.splice(index, 1);
    }
  }
}
