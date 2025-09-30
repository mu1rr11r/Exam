import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-exam',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.css']
})
export class NewExamComponent implements OnInit {
  name = new FormControl('');
  questions: any[] = [];
  questionsforme!: FormGroup;
  coractname: any;

  private readonly _FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.questionsforme = this._FormBuilder.group({
      question: ['', [Validators.required]],
      answer1: ['', [Validators.required]],
      answer2: ['', [Validators.required]],
      answer3: ['', [Validators.required]],
      answer4: ['', [Validators.required]],
    });
  }

  cratequestion() {
    if (this.coractname) {
      const model = {
        question: this.questionsforme.value.question,
        answer1: this.questionsforme.value.answer1,
        answer2: this.questionsforme.value.answer2,
        answer3: this.questionsforme.value.answer3,
        answer4: this.questionsforme.value.answer4,
        corecranswer: this.coractname
      };
      this.questions.push(model);
      this.questionsforme.reset();
      this.coractname = null;
    }
  }

  getcoraect(event: any) {
    this.coractname = event.target.value;
    console.log( event.value);
  }
}
