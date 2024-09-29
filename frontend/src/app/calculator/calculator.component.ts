import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

enum CalcOperators{
  plus = '+',
  minus = '-',
  multiple = '*',
  divider = '/'
}
enum CalcModifier {
  sin = 'sin',
  cos = 'cos',
  sqrt = 'sqrt',
  none = 'none'
}

interface CalcVar {
  modifier: CalcModifier,
  value: number
}

interface CalcGroup {
  one: CalcVar,
  two: CalcVar,
  operator: CalcOperators
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  protected header = 'Just work'
  first: number = 1
  second: number = 1
  operator: string = '+'
  // operators: string[] = ['+', '-', '*', '/']
  public calcvar = CalcOperators
  public calcmodifier = CalcModifier
  private defaultGroup = {
    one: {
      value: 5,
      modifier: CalcModifier.none
    },
    two: {
      value: 5,
      modifier: CalcModifier.none
    },
    operator: CalcOperators.plus
  }
  public calcgroups: CalcGroup[] = [this.defaultGroup]
  public operatorBetweenGroups: CalcOperators[] = [CalcOperators.plus]
  public history: string[] = []
  public result: number = 0
  
  addGroup(): void { 
    this.calcgroups.push(this.defaultGroup) 
  }
  deleteGroup(index: number): void {
    this.calcgroups.splice(index, 1)
  }
  getCalcWithModifier(value: CalcVar) {
    switch (value.modifier) {
      case CalcModifier.none: return value.value
      case CalcModifier.sin: return Math.sin(value.value)
      case CalcModifier.cos: return Math.cos(value.value)
      case CalcModifier.sqrt: return Math.sqrt(value.value)
    }
  }
  getCalc(first: number, second: number, operator: CalcOperators): number {
    switch(operator) {
      case CalcOperators.plus : return first + second;
      case CalcOperators.minus: return first - second;
      case CalcOperators.multiple: return first * second;
      case CalcOperators.divider: return first / second;
    }
  }
  getCalcGroup() {
    let result: number = 0
    let tempHistory: string[] = []
    this.calcgroups.forEach((group, i) => {

      if(i == 0) {
        result = this.getCalc(
                this.getCalcWithModifier(group.one),
                this.getCalcWithModifier(group.two),
                group.operator
        )
      }

      else {
        let tempResult = this.getCalc(
          this.getCalcWithModifier(group.one),
          this.getCalcWithModifier(group.two),
          group.operator
        )
        result = this.getCalc(result, tempResult, this.operatorBetweenGroups[i-1])
      }

      tempHistory.push(`
      (
        ${group.one.modifier !== CalcModifier.none ? group.one.modifier : ''}
        ${group.one.value}
        ${group.operator}
        ${group.two.modifier !== CalcModifier.none ? group.two.modifier : ''}
        ${group.two.value}
      ) ${this.operatorBetweenGroups[i]}
      `)
      console.log(this.operatorBetweenGroups[i])
    })
    tempHistory.push(`=${result}`)
    this.history.push(tempHistory.join(' '))
    this.result = result
    
  }
}
