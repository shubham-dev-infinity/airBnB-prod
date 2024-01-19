
$(document).ready(function () {
  $('select').niceSelect();
  // $("html").niceScroll();	
  // $(".list").niceScroll();
  $('.xyz').on('click', function () {

    event();
  });
});
// -----------------------------------------------------------------------------------------------------------------------------------


//  ----------------------------------------------------------------------- GRAPH 1 ------------------------------------------------------------
$(function () {
  $('#container').highcharts({
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Campaign Activity'
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      type: 'datetime',
      labels: {
        overflow: 'justify'
      }
    },
    yAxis: {
      title: {
        text: 'Daily Activity Totals'
      },
      min: 0,
      minorGridLineWidth: 0,
      // gridLineWidth: 0,
      // alternateGridColor: null,
      // plotBands: []
    },
    tooltip: {
      // valueSuffix: ' users/week'
    },
    plotOptions: {
      spline: {
        lineWidth: 4,
        states: {
          hover: {
            lineWidth: 3
          }
        },
        marker: {
          enabled: false
        },
        pointInterval: 86400000 * 7,
        pointStart: Date.UTC(2009, 9, 6, 0, 0, 0)
      }
    },
    series: [{
      name: 'New Users',
      data: [130, 260, 350, 250, 400, 450, 300, 200, 100, 180, 220, 250, 290, 350, 370, 390, 170, 350, 200, 230, 280, 150, 201, 140, 110, 240, 330, 230, 380,]
    }, {
      name: 'Active Users',
      data: [120, 150, 170, 190, 110, 150, 200, 230, 280, 150, 201, 140, 110, 240, 330, 230, 380, 430, 280, 180, 80, 150, 190, 220, 260, 310, 330, 350, 130, 310]
    }, {
      name: 'Sweepstakes Registrations',
      data: [150, 180, 200.5, 220, 140, 180, 250, 280, 330, 180, 221, 160, 130, 260, 350, 250, 400, 450, 300, 200, 100, 180, 220, 250, 290, 350, 370, 390, 170, 350]
    }]
    ,
    navigation: {
      menuItemStyle: {
        fontSize: '20px'
      }
    }
  });
});

//------------------------------------------------------------------- GRAPH 2 --------------------------------------------------------------
$(function () {
  $('#garph_data_two').highcharts({
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Campaign Activity'
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      type: 'datetime',
      labels: {
        overflow: 'justify'
      }
    },
    yAxis: {
      title: {
        text: 'Daily Activity Totals'
      },
      min: 0,
      minorGridLineWidth: 0,
      // gridLineWidth: 0,
      // alternateGridColor: null,
      // plotBands: []
    },
    tooltip: {
      // valueSuffix: ' users/week'
    },
    plotOptions: {
      spline: {
        lineWidth: 4,
        states: {
          hover: {
            lineWidth: 3
          }
        },
        marker: {
          enabled: false
        },
        pointInterval: 86400000 * 7,
        pointStart: Date.UTC(2009, 9, 6, 0, 0, 0)
      }
    },
    series: [{
      name: 'New Users',
      data: [130, 260, 350, 250, 400, 450, 300, 200, 100, 180, 220, 250, 290, 350, 370, 390, 170, 350, 200, 230, 280, 150, 201, 140, 110, 240, 330, 230, 380,]
    }, {
      name: 'Active Users',
      data: [120, 150, 170, 190, 110, 150, 200, 230, 280, 150, 201, 140, 110, 240, 330, 230, 380, 430, 280, 180, 80, 150, 190, 220, 260, 310, 330, 350, 130, 310]
    }, {
      name: 'Sweepstakes Registrations',
      data: [150, 180, 200.5, 220, 140, 180, 250, 280, 330, 180, 221, 160, 130, 260, 350, 250, 400, 450, 300, 200, 100, 180, 220, 250, 290, 350, 370, 390, 170, 350]
    }]
    ,
    navigation: {
      menuItemStyle: {
        fontSize: '20px'
      }
    }
  });
});


//---------------------------------------------------------------------------------------------------------------------------------

// window.addEventListener('DOMContentLoaded', event => {

//   // Toggle the side navigation
//   const sidebarToggle = document.body.querySelector('#sidebarToggle');
//   if (sidebarToggle) {
//     // Uncomment Below to persist sidebar toggle between refreshes
//     // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
//     //     document.body.classList.toggle('sb-sidenav-toggled');
//     // }
//     sidebarToggle.addEventListener('click', event => {
//       event.preventDefault();
//       document.body.classList.toggle('sb-sidenav-toggled');
//       localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
//     });
//   }

// });


// window.addEventListener('DOMContentLoaded', event => {

//   // Toggle the side navigation
//   const sidebarToggle = document.body.querySelector('#sidebarToggle');
//   if (sidebarToggle) {
//     sidebarToggle.addEventListener('click', event => {
//       event.preventDefault();
//       document.body.classList.toggle('sb-sidenav-toggled');

//       // Check the current state and update the button icon
//       const isToggled = document.body.classList.contains('sb-sidenav-toggled');
//       const icon = document.querySelector('#sidebarToggle i');
//       icon.className = isToggled ? 'fa-solid fa-bars' : 'fa-solid fa-xmark';

//       localStorage.setItem('sb|sidebar-toggle', isToggled);
//     });
//   }

// });


window.addEventListener('DOMContentLoaded', event => {

  // Close sidebar button
  const sidebarClose = document.body.querySelector('#sidebarClose');
  if (sidebarClose) {
    sidebarClose.addEventListener('click', event => {
      event.preventDefault();
      document.body.classList.remove('sb-sidenav-toggled');
      // localStorage.setItem('sb|sidebar-toggle', 'false');
    });
  }

  // Open sidebar button
  const sidebarOpen = document.body.querySelector('#sidebarOpen');
  if (sidebarOpen) {
    sidebarOpen.addEventListener('click', event => {
      event.preventDefault();
      document.body.classList.add('sb-sidenav-toggled');
      // localStorage.setItem('sb|sidebar-toggle', 'true');
    });
  }

  // Check and set initial state
  const initialToggleState = localStorage.getItem('sb|sidebar-toggle') === 'true';
  document.body.classList.toggle('sb-sidenav-toggled', initialToggleState);

  // Update the icon based on the initial state
  const icon = document.querySelector(`#${initialToggleState ? 'sidebarOpen' : 'sidebarClose'} i`);
  icon.className = initialToggleState ? 'fa-solid fa-bars' : 'fa-solid fa-xmark';

});



