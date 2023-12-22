import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, Colors, registerables } from 'chart.js';
Chart.register(...registerables);
Chart.register(Colors);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

  chart:any;
  constructor(){this.renderChart}


  @ViewChild('chart') ctx :ElementRef;
  colors = {
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)"
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)"
    }
  };
  renderChart() {
 
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart
 
      data: {// values on X-Axis
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
        ],
        datasets: [
          {
            label: "Revenue",
            data: [50000, 25000, 40000, 15000, 30000, 85000, 160000, 75000, 190000, 150000, 200000, 215000],
            // data : this.revenues,
            backgroundColor: "rgba(53, 89, 233,0.1)",
            borderColor: '#3559E9',
            pointBackgroundColor: '#3559E9',
            fill: true,
            pointRadius: 3,
            borderWidth: 2,
            tension: 0.4
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
 
          }
        }
      }
 
    });
  }
}
