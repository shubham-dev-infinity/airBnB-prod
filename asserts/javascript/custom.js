
$(document).ready(function() {
  $(".custom-select").each(function () {
      var classes = $(this).attr("class"),
          id = $(this).attr("id"),
          name = $(this).attr("name");
      var template = '<div class="' + classes + '">';
      template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
      template += '<div class="custom-options">';
      $(this).find("option").each(function () {
          template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
      });
      template += '</div></div>';

      $(this).wrap('<div class="custom-select-wrapper"></div>');
      $(this).hide();
      $(this).after(template);
  });

  $(".custom-option:first-of-type").hover(function () {
      $(this).parents(".custom-options").addClass("option-hover");
  }, function () {
      $(this).parents(".custom-options").removeClass("option-hover");
  });

  $(".custom-select-trigger").on("click", function (event) {
      $(".custom-select").removeClass("opened"); // Close all other selectors
      $(this).parents(".custom-select").toggleClass("opened");
      event.stopPropagation();
  });

  $(".custom-option").on("click", function () {
      $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
      $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
      $(this).addClass("selection");
      $(this).parents(".custom-select").removeClass("opened");
      $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
  });

  $(document).on("click", function () {
      $(".custom-select").removeClass("opened");
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
      text: 'VALUE PROJECTION',
      align: 'left', // Set the title alignment to left
      style: {
        color: 'var(--Text-Text, #8391A2)', // Set text color using CSS variable
        fontSize: '18px',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: '20px',
        textTransform: 'uppercase'
      }
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
      data: [130, 260, 350, 250, 400, 450, 300, 200, 100, 180, 220, 250, 290, 350, 370, 390, 170, 350, 200, 230, 280, 150, 201, 140, 110, 240, 330, 230, 380,],
      color: '#F0191C'
    }, {
      name: 'Active Users',
      data: [120, 150, 170, 190, 110, 150, 200, 230, 280, 150, 201, 140, 110, 240, 330, 230, 380, 430, 280, 180, 80, 150, 190, 220, 260, 310, 330, 350, 130, 310],
      color: '#225CCB'
    }, {
      name: 'Sweepstakes Registrations',
      data: [150, 180, 200.5, 220, 140, 180, 250, 280, 330, 180, 221, 160, 130, 260, 350, 250, 400, 450, 300, 200, 100, 180, 220, 250, 290, 350, 370, 390, 170, 350],
      color: '#167807'
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
      text: 'EQUITY GROWTH ON INTEREST ONLY',
      align: 'left', // Set the title alignment to left
      style: {
        color: 'var(--Text-Text, #8391A2)', // Set text color using CSS variable
        fontSize: '18px',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: '20px',
        textTransform: 'uppercase'
      }
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
      data: [130, 260, 350, 250, 400, 450, 300, 200, 100, 180, 220, 250, 290, 350, 370, 390, 170, 350, 200, 230, 280, 150, 201, 140, 110, 240, 330, 230, 380,],
      color: '#F0191C'
    }, {
      name: 'Active Users',
      data: [120, 150, 170, 190, 110, 150, 200, 230, 280, 150, 201, 140, 110, 240, 330, 230, 380, 430, 280, 180, 80, 150, 190, 220, 260, 310, 330, 350, 130, 310],
      color: '#225CCB'
    }, {
      name: 'Sweepstakes Registrations',
      data: [150, 180, 200.5, 220, 140, 180, 250, 280, 330, 180, 221, 160, 130, 260, 350, 250, 400, 450, 300, 200, 100, 180, 220, 250, 290, 350, 370, 390, 170, 350],
      color: '#167807'
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



