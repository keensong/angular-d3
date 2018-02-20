import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Address } from './../model/data.model';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './flow.component.html',
    styleUrls: ['./flow.component.css']
})
export class FlowComponent {

    flowForm: FormGroup;
    nameChangeLog: string[] = [];

    constructor(
        private fb: FormBuilder
    ) {
        this.createForm();
    }

    createForm() {
        this.flowForm = this.fb.group({
            name: '',
            secretLairs: this.fb.array([]),
            power: '',
            sidekick: ''
        });
    }

    get secretLairs(): FormArray {
        return this.flowForm.get('secretLairs') as FormArray;
    }

    addLair() {
        this.secretLairs.push(this.fb.group(new Address()));
    }

    deleteRow(index) {
        console.log(index);
        const control = <FormArray>this.flowForm.controls['secretLairs'];
        control.removeAt(index);
    }
}
