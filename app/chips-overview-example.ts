import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
} from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

/**
 * @title Basic chips
 */
@Component({
  selector: 'chips-overview-example',
  templateUrl: 'chips-overview-example.html',
  styleUrls: ['chips-overview-example.css'],
})
export class ChipsOverviewExample {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  codeReviewerCtrl = new FormControl();
  filteredCodeReviewers: Observable<string[]>;
  codeReviewers: any = [];
  allCodeReviewers: any = [
    {
      display_name: 'Pranita Ananda Jadhav',
      uuid: '{d74946e9-b60e-451f-9636-543de534bcee}',
    },
    {
      display_name: 'Ashwin kawade',
      uuid: '{c528f949-55ec-401a-aefe-82f7f6783800}',
    },
    {
      display_name: 'Pranita Jadhav',
      uuid: '{d0844247-1730-4d78-9bb5-aef57613d5af}',
    },
    {
      display_name: 'Bshwin kawade',
      uuid: '{c528f949-55ec-401a-aefe-82f7f6783800}',
    },
  ];

  @ViewChild('codeReviewerInput') codeReviewerInput: ElementRef;

  constructor() {
    this.filteredCodeReviewers = this.codeReviewerCtrl.valueChanges.pipe(
      startWith(null),
      map((codeReviewer: string | null) =>
        codeReviewer ? this._filterCodeReviewer(codeReviewer) : this._filterCodeReviewerSlice()
      )
    );
  }

  addCodeReviewer(event: MatChipInputEvent): void {
    debugger;
    const input = event.input;
    const value = event.value;
    // Add our codeReviewer
    if ((value || '').trim()) {
    }
    console.log('codeReviewers', this.codeReviewers);
    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.codeReviewerCtrl.setValue(null);
  }

  removeCodeReviewer(codeReviewer, indx): void {
    this.codeReviewers.splice(indx, 1);
  }

  selectedCodeReviewer(event: MatAutocompleteSelectedEvent): void {
    this.codeReviewers.push(event.option.value);
    this.codeReviewerInput.nativeElement.value = '';
    this.codeReviewerCtrl.setValue(null);
    console.log('codeReviewers', this.codeReviewers);
  }

  private _filterCodeReviewer(value: any) {
    console.log(value);
    // return this.allCodeReviewers.filter((codeReviewer) =>
    //   codeReviewer.display_name.toLowerCase().includes(value.toLowerCase())
    // );
    if (typeof value == 'object') {
      console.log('helldd');
      return this.allCodeReviewers.filter((codeReviewer) =>
        codeReviewer.display_name
          .toLowerCase()
          .includes(
            value.display_name.toLowerCase() &&
              !this.codeReviewers.includes(codeReviewer)
          )
      );
    } else {
      console.log('hellddhjhhj');
      return this.allCodeReviewers.filter(
        (codeReviewer) =>
          codeReviewer.display_name
            .toLowerCase()
            .includes(value.toLowerCase()) &&
          !this.codeReviewers.includes(codeReviewer)
      );
    }
  }
  _filterCodeReviewerSlice() {
    return this.allCodeReviewers.filter(
      (allCodeReviewers) => !this.codeReviewers.includes(allCodeReviewers)
    );
  }
}
