$( function() {
    var dateFormat = "mm/dd/yy",
      starts = $( "#starts" ).datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          numberOfMonths: 1,
          showButtonPanel: true
        })
        .on( "change", function() {
          ends.datepicker( "option", "minDate", getDate( this ) );
        }),
      ends = $( "#ends" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1,
        showButtonPanel: true
      })
      .on( "change", function() {
        starts.datepicker( "option", "maxDate", getDate( this ) );
      });

    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }

      return date;
    }
  } );
