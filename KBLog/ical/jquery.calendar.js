/*
 * @name	ICalendar Jquery Plugin
 * @author	jjperezaguinaga
 * @version	1.0
 * @desc	ICalendar like functional jquery based calendar.
*/
(function($) {
  //PLUGIN SHELL
  $.fn.iCalendar = function() {
    // PLUGIN CODE
	/*
	* Class Month Constructor
	* @param int month (-1 - 12) Month index.
	* @param int currentDay (0 - 31) Current day in the month.
	* @param int currentWeekday (0 - 6) Weekday index.
	* @param int isLeapYear (1 | 0)
	* @param array Weekdays Array of English versions of Weekdays
	* @param array Months Array of English versions of Months
	* @returns NULL
	* @desc	Month Constructor 
	*/
	var tahun, bulan;
	var tanggalmulai, bulanmulai, tahunmulai;
	var tanggalberhenti, bulanberhenti, tahunberhenti;
	var tanggalmulaisebelumnya, bulanmulaisebelumnya, tahunmulaisebelumnya;
	var tanggalberhentisebelumnya, bulanberhentisebelumnya, tahunberhentisebelumnya;
	var tanggaldipilih, bulandipilih, tahundipilih;
	function updatedatabase(blnthn, interval, masa){
		if(blnthn==localStorage.kblogblnthn1){
			localStorage.kbloginterval1 = interval;
			localStorage.kblogmasa1 = masa;
		}else if(blnthn==localStorage.kblogblnthn2){
			localStorage.kbloginterval2 = interval;
			localStorage.kblogmasa2 = masa;
		}else if(blnthn==localStorage.kblogblnthn3){
			localStorage.kbloginterval3 = interval;
			localStorage.kblogmasa3 = masa;
		}else if(blnthn==localStorage.kblogblnthn4){
			localStorage.kbloginterval4 = interval;
			localStorage.kblogmasa4 = masa;
		}else if(blnthn==localStorage.kblogblnthn5){
			localStorage.kbloginterval5 = interval;
			localStorage.kblogmasa5 = masa;
		}else if(blnthn==localStorage.kblogblnthn6){
			localStorage.kbloginterval6 = interval;
			localStorage.kblogmasa6 = masa;
		}else if(blnthn==localStorage.kblogblnthn7){
			localStorage.kbloginterval7 = interval;
			localStorage.kblogmasa7 = masa;
		}else if(blnthn==localStorage.kblogblnthn8){
			localStorage.kbloginterval8 = interval;
			localStorage.kblogmasa8 = masa;
		}else if(blnthn==localStorage.kblogblnthn9){
			localStorage.kbloginterval9 = interval;
			localStorage.kblogmasa9 = masa;
		}else if(blnthn==localStorage.kblogblnthn10){
			localStorage.kbloginterval10 = interval;
			localStorage.kblogmasa10 = masa;
		}else if(blnthn==localStorage.kblogblnthn11){
			localStorage.kbloginterval11 = interval;
			localStorage.kblogmasa11 = masa;
		}else if(blnthn==localStorage.kblogblnthn12){
			localStorage.kbloginterval12 = interval;
			localStorage.kblogmasa12 = masa;
		}else if(blnthn==localStorage.kblogblnthn13){
			localStorage.kbloginterval13 = interval;
			localStorage.kblogmasa13 = masa;
		}else if(blnthn==localStorage.kblogblnthn14){
			localStorage.kbloginterval14 = interval;
			localStorage.kblogmasa14 = masa;
		}else if(blnthn==localStorage.kblogblnthn15){
			localStorage.kbloginterval15 = interval;
			localStorage.kblogmasa15 = masa;
		}else if(blnthn==localStorage.kblogblnthn16){
			localStorage.kbloginterval16 = interval;
			localStorage.kblogmasa16 = masa;
		}else if(blnthn==localStorage.kblogblnthn17){
			localStorage.kbloginterval17 = interval;
			localStorage.kblogmasa17 = masa;
		}else if(blnthn==localStorage.kblogblnthn18){
			localStorage.kbloginterval18 = interval;
			localStorage.kblogmasa18 = masa;
		}else if(blnthn==localStorage.kblogblnthn19){
			localStorage.kbloginterval19 = interval;
			localStorage.kblogmasa19 = masa;
		}else if(blnthn==localStorage.kblogblnthn20){
			localStorage.kbloginterval20 = interval;
			localStorage.kblogmasa20 = masa;
		}
	}
	function updateblnthn(urutan, blndanthn){
		if(urutan==1){
			localStorage.kblogblnthn1 = blndanthn;
		}else if(urutan==2){
			localStorage.kblogblnthn2 = blndanthn;
		}
		// LANJUTKAN ULINUHA
	}
	function Month(month, currentDay, currentWeekday, isLeapYear, Weekdays, Months, tanggalmulai, tanggalberhenti) {
			//Initial month data
			this.isValid = 1;		//int Shows if the Month has valid dates. Value is 0 when not.
			this.yearChanged = 0;	//int Turns in on rendering when a year changes (-1 - 1)
			
			// @param int month (-1 - 12) Month index.
			// this.name = String Version of the Month (Months[month])
			if (typeof(month) === 'undefined') {
				this.name = "January";
				this.monthIndex = 0;
			} else {
				this.name = this.getMonth(month, Months);		//Also updates this.monthIndex and this.yearChanged;
				// @todo Review if this is the best design pattern to update monthIndex and yearChanged
				// One method is changing to private class members.
				if (this.yearChanged !== 0) {
					if (this.yearChanged === 1) {
						tahun = tahun + 1;
					} else {
						tahun = tahun - 1;
					}
				}
			}
			
			/* By this stage, the following variables have been started and can be used safely
			* 	this.yearChanged
			* 	this.name
			* 	this.monthIndex
			*/
			
			this.days = this.getDays(this.name, Months);		//if this.name is not in Months, Month is invalid
			
			// @param int currentDay (0 - 31) Current day in the month.
			// We just assign it to currentDay, then check it out if it's less than this.days.
			if (typeof(currentDay) === 'undefined') {
				this.currentDay = 1;
			} else {
				this.currentDay = currentDay;
				if (this.currentDay > this.days) {
					this.isValid = 0;
				}
			}
			
			if (typeof(currentWeekday) === 'undefined') {
				this.currentWeekday = "Monday";
			} else {
				this.currentWeekday = this.getWeekday(currentWeekday, Weekdays);
			}
			this.previousMonthLastDay = this.getPreviousMonthLastDay(Months);
			this.firstWeekday = this.getFirstWeekday(Weekdays);
			this.firstWeekdayIndex = this.getFirstWeekdayIndex(Weekdays);
			this.lastWeekday = this.getLastWeekday(Weekdays);
			this.daysData = this.renderDays();
			for (var i = 0; i < Weekdays.length; i++) {
					if (Weekdays[i] ===  this.currentWeekday) {
						this.currentWeekdaysIndex = i; break;
					}
				}
		}
		
	/*
	* Class Month getMonth
	* @param int index (-1 - 12) Month index.
	* @param array Months Array of English versions of Months
	* @desc Gets the string version of the Month, checking on limits and updating the monthIndex and yearChanged if neccesary.
	* @returns Either the string version of the Month or invalid if the range of index is over the limits
	*/
		Month.prototype.getMonth = function(index, Months) {
			if (index <= 12 && index >= -1) {
				if (index == 12) {
					this.yearChanged = 1;
					this.monthIndex = 0;
					return Months[0].name;
				} else if (index == -1) {
					this.yearChanged = -1;
					this.monthIndex = 11;
					return Months[11].name;
				} else {
					this.monthIndex = index;
					return Months[index].name;
				}
			} else {
				this.monthIndex = -42;	//Invalid monthIndex
				this.isValid = 0;		//Invalid month
				return 'Invalid';
			}
		}
		
	/*
	* Class Month getDays
	* @param string month ("January" - "December") Month String name.
	* @param array Months Array of English versions of Months
	* @desc Gets the number of days that month has, which is defnied in Months array. If not, month is invalid.
	* @returns The amount of days month has, or invalid if month was not found in the Months array.
	*/	
		Month.prototype.getDays = function(month, Months) {		
			for (var i = 0; i < Months.length; i++) {
				if(Months[i].name === month) return Months[i].days;
			}
			this.isValid = 0;
			return -1;
		}
	
	/*
	* Class Month getWeekday
	* @param int index (-1 - 12) Weekday index.
	* @param array Months Array of English versions of Months
	* @desc Gets the string version of the Month, checking on limits and updating the monthIndex and yearChanged if neccesary.
	* @returns Either the string version of the Month or invalid if the range of index is over the limits
	*/
		Month.prototype.getWeekday = function(index, Weekdays) {
			if (index <= 7 && index >= -1) {
				if(index == 7) {
					return Weekdays[0];
				} else if(index == -1) {
					return Weekdays[6];
				} else {
					return Weekdays[index];
				}
			} else {
				this.isValid = 0;
				return 'Invalid';
			}
			
		}
		
		Month.prototype.getFirstWeekdayIndex = function(Weekdays) {
			for (var i = 0; i < Weekdays.length; i++) {
				if (Weekdays[i] ===  this.firstWeekday) {
					return i;
				}
			}
			this.isValid = 0;
			return -1;
		}
		
		Month.prototype.getPreviousMonthLastDay = function(Months) {
			for (var i = 0; i < Months.length; i++) {
				if(Months[i].name === this.name) {
					if (i > 0) {
						return Months[i-1].days;
					} else {
						return Months[11].days;
					}
				}				
			}
			this.isValid = 0;
			return -1;
		}
				
		
		
		Month.prototype.getFirstWeekday = function(Weekdays) {
			if (this.isValid) {
				var currentDay = this.currentDay;			
				var initialIndex = 0;
				for (var i = 0; i < Weekdays.length; i++) {
					if (Weekdays[i] ===  this.currentWeekday) {
						initialIndex = i; break;
					}
				}
				
				var firstweekday; 
				while(currentDay-- > 0) {
					firstweekday = Weekdays[initialIndex--];
					if (initialIndex < 0) {
						initialIndex = 6;
					}
				}
				
				var previousMonthDays = this.previousMonthLastDay;
				while(previousMonthDays-- > 0) {
					if(initialIndex-- <= 0) {
						initialIndex = 6;
					}
				}
				
				if (initialIndex++ > 6) {
					initialIndex = 0;
				}
				
				this.pastFirstWeekdayIndex = initialIndex;
				return firstweekday;
			} else {
				return 'undefined';
			}
		}
		
		Month.prototype.getLastWeekday = function(Weekdays) {
			if (this.isValid) {
				var currentDay = this.currentDay;
				var initialIndex = 0;
				for (var i = 0; i < Weekdays.length; i++) {
					if (Weekdays[i] ===  this.currentWeekday) {
						initialIndex = i; break;
					}
				}
				
				var lastweekday;
				while(currentDay++ <= this.days) {
					lastweekday = Weekdays[initialIndex++];
					if (initialIndex > 6) {
						initialIndex = 0;
					}
				}
				
				if (initialIndex > 6) {
					initialIndex = 0;
				}
				
				this.nextLastWeekdayIndex = initialIndex;
				return lastweekday;
			} else {
				return 'undefined';
			}
		}
		
		Month.prototype.renderDays = function() {
			if (this.isValid) {
			var padding = this.firstWeekdayIndex;
			var lastMonthDay = this.previousMonthLastDay - padding + 1;
			var firstMonthDay = 1;
			var days 	= 1;
			var days_display = [];
			for (var i = 1; i <= 6; i++) {
				var rows = Array();
				for(var j = 1; j <= 7; j++) {
				
					if (padding-- > 0) {
						rows.push({day: lastMonthDay++, style_class:"class=off_month"});
						continue;
					}
					
					if (days > this.days) {
						rows.push({day: firstMonthDay++, style_class:"class=off_month"});
						continue;
					}
					if (days == this.currentDay) {
						rows.push({day:days++, style_class:"class=today"});
					} else if(tahun >= tahunmulai && tahun <= tahunberhenti){
						if (tahun > tahunmulai && tahun < tahunberhenti){
							rows.push({day:days++, style_class:"class=date_has_event"});
						} else if(tahunmulai != tahunberhenti){
							if (tahun == tahunmulai){
								if(this.monthIndex > bulanmulai){
									rows.push({day:days++, style_class:"class=date_has_event"});
								} else if (this.monthIndex == bulanmulai && days >= tanggalmulai){
									rows.push({day:days++, style_class:"class=date_has_event"});
								} else {
									rows.push({day:days++});
								}
							} else if (tahun == tahunberhenti){
								if(this.monthIndex < bulanberhenti){
									rows.push({day:days++, style_class:"class=date_has_event"});
								} else if (this.monthIndex == bulanberhenti && days <= tanggalberhenti){
									rows.push({day:days++, style_class:"class=date_has_event"});
								} else {
									rows.push({day:days++});
								}
							} else {
								rows.push({day:days++});
							}
						} else if (this.monthIndex >= bulanmulai && this.monthIndex <= bulanberhenti) {
							if(this.monthIndex > bulanmulai && this.monthIndex < bulanberhenti){
								rows.push({day:days++, style_class:"class=date_has_event"});
							} else if (bulanmulai != bulanberhenti){
								if (this.monthIndex == bulanmulai && days >= tanggalmulai){
									rows.push({day:days++, style_class:"class=date_has_event"});
								} else if (this.monthIndex == bulanberhenti && days <= tanggalberhenti){
									rows.push({day:days++, style_class:"class=date_has_event"});
								} else {
									rows.push({day:days++});
								}
							} else if (days >= tanggalmulai && days <= tanggalberhenti){
								rows.push({day:days++, style_class:"class=date_has_event"});
							} else {
								rows.push({day:days++});
							}
						} else {
							rows.push({day:days++});
						}
					} else {
						rows.push({day:days++});
					}
				}
				days_display[i] = {row: i, data: rows};
			}
				return days_display;
			} else {
				return Array();
			}
		}
		
		function Calendar(year, month, currentDay, currentWeekday) {
			tahun = year;
			if (typeof(year) === 'undefined') {
				this.year = 1970;
			} else {
				this.year = year;
				this.tanggaldiklik = false;
			}
			tanggalmulai = 0;
			bulanmulai = 0;
			tahunmulai = 0;
			this.isLeapYear = this.getLeapYear();
			//@todo Add multilanguange options
			//Constants; 
			this.weekdays = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
			this.months = this.getMonths();
			this.month = new Month(month, currentDay, currentWeekday, this.isLeapYear, this.weekdays, this.months, tanggalmulai, tanggalberhenti);
		}
		
		
		Calendar.prototype.getMonths = function() {
			return [{name: "January", days: 31},
				 {name: "February", days: (this.isLeapYear === true) ? 29 : 28},
				 {name: "March", days: 31},
				 {name: "April", days: 30},
				 {name: "May", days: 31},
				 {name: "June", days: 30},
				 {name: "July", days: 31},
				 {name: "August", days: 31},
				 {name: "September", days: 30},
				 {name: "October", days: 31},
				 {name: "November", days: 30},
				 {name: "December", days: 31},
				];
		}
		
		Calendar.prototype.updateMonth = function(year, month, currentDay, currentWeekday) {
			this.month = new Month(month, currentDay, currentWeekday, this.isLeapYear, this.weekdays, this.months, tanggalmulai, tanggalberhenti);
			if (this.month.yearChanged !== 0) {
				if (this.month.yearChanged === 1) {
					this.year = this.year + 1;
				} else {
					this.year = this.year - 1;
				}
				this.month.yearChanged = 0;
				this.isLeapYear = this.getLeapYear();
				this.months = this.getMonths();
			}
		}
		Calendar.prototype.updatePilihanMulai = function(){
		localStorage.kblog = "";
			tanggalmulai = tanggaldipilih;
			bulanmulai = bulandipilih;
			tahunmulai = tahundipilih;
			bulan = this.getMonths();
			tahunberhenti = tahundipilih;
			if ((bulan[bulandipilih].days-tanggaldipilih) < localStorage.kblogmasa){
				if ((bulandipilih+1) > 11){
					bulanberhenti = 0;
					tahunberhenti = tahundipilih+1;
				} else {
					bulanberhenti = bulandipilih+1;
				}
				tanggalberhenti = (localStorage.kblogmasa-1)-(bulan[bulandipilih].days-tanggaldipilih);
			} else {
				bulanberhenti = bulandipilih;
				tanggalberhenti = tanggalmulai + (localStorage.kblogmasa-1);
			}
			this.updatedatasemua(20, true);
			this.tanggaldiklik = false;
		}
		Calendar.prototype.updatePilihanBerhenti = function(tanggalnya){
			if (tahunmulai <= tahundipilih){
				if (tahunmulai < tahundipilih){
					tanggalberhenti = tanggaldipilih;
					bulanberhenti = bulandipilih;
					tahunberhenti = tahundipilih;
					this.gantimasaawal();
				} else if(bulanmulai <= bulandipilih){
					if(bulanmulai < bulandipilih) {
						tanggalberhenti = tanggaldipilih;
						bulanberhenti = bulandipilih;
						tahunberhenti = tahundipilih;
						this.gantimasaawal();
					} else if(tanggalmulai < tanggaldipilih) {
						tanggalberhenti = tanggaldipilih;
						bulanberhenti = bulandipilih;
						tahunberhenti = tahundipilih;
						this.gantimasaawal();
					}
				}
			}
			this.tanggaldiklik = false;
		}
		Calendar.prototype.gantimasaawal = function(){
			if (localStorage.kblogsudahpilih!="sudah"){
				var bln=this.month.monthIndex;
				var thn=this.year;
				var total=0;
				if(bln>11){
					bln = 0;
					thn++;
				}
				this.updatedatasemua(20, false);
			} else {
			
			}
		}
		Calendar.prototype.updatePilihanMulaiAwal = function(tanggalnya){
			tanggaldipilih = tanggalnya;
			bulandipilih = this.month.monthIndex;
			tahundipilih = this.year;
			this.tanggaldiklik = true;
		}
		Calendar.prototype.getLeapYear = function() {
			if (this.year % 4 === 0) {
				if (this.year % 100 === 0) {
					if (this.year % 400 === 0) {
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			} else {
				return false;
			}
		}
		Calendar.prototype.coba = function(){
			alert(Months.name);
		}
		Calendar.prototype.updatedatasemua = function(maxtotal, updatebulantahun) {
			var bln=this.month.monthIndex;
			var thn=this.year;
			var total=0;
			while(total<maxtotal){
				if(bln>11){
					bln = 0;
					thn++;
				}
				total++;
				if(updatebulantahun==true){
					updateblnthn(total, bln+"-"+thn);
				}
				updatedatabase(bln+"-"+thn, localStorage.kbloginterval, localStorage.kblogmasa);
				bln++;
			}
		}
		Calendar.prototype.muatbulantahun = function (bulannya) {
			var bln=bulannya;
			var thn=this.year;
			bulan = this.getMonths();
			if(bln+"-"+thn==localStorage.kblogblnthn2){
				tanggalmulaisebelumnya = tanggalmulai;
				bulanmulaisebelumnya = bulanmulai;
				tahunmulaisebelumnya = tahunmulai;
				tanggalberhentisebelumnya = tanggalberhenti;
				bulanberhentisebelumnya = bulanberhenti;
				tahunberhentisebelumnya = tahunberhenti;
				tanggalmulai = (localStorage.kbloginterval1-(bulan[bulanmulaisebelumnya].days-tanggalmulaisebelumnya));
				if (tanggalmulai>bulan[bln].days){
					tanggalmulai=0;
					bulanmulai=0;
					tahunmulai=0;
				} else {
					bulanmulai = bln;
					bulanberhenti = bln;
					tahunmulai = thn;
					tahunberhenti = thn;
					if ((bulan[bln].days-tanggalmulai) < localStorage.kblogmasa2){
						if ((bln+1) > 11){
							bulanberhenti = 0;
							tahunberhenti = thn+1;
						} else {
							bulanberhenti = bln+1;
						}
						tanggalberhenti = localStorage.kblogmasa2-(bulan[bulandipilih].days-tanggalmulai);
					} else {
						tanggalberhenti = tanggalmulai + (localStorage.kblogmasa2-1);
					}
				}
			}
		}
		
		Calendar.prototype.renderCalendar = function () {
			//Template for Calendar
		var template = 
		"<table cellspacing='0' width='320'>\
		<thead>\
		<tr>\
		<th colspan='2' class='ical-header ical-prev'>\Prev</th>\
		<th colspan='3' class='ical-header month'>\{{#month}}{{name}}{{/month}}&nbsp;{{year}}</th>\
		<th colspan='2' class='ical-header ical-next'>\Next</th>\
		</tr>\
		<tr>\
		{{#weekdays}}\
		<th>{{.}}</th>\
		{{/weekdays}}\
		</tr>\
		</thead>\
		<tbody>\
		{{#month}}\
		{{#daysData}}\
		<tr>\
		{{#data}}\
		<td {{style_class}} id='ical-{{day}}' style='cursor: pointer;'>\
		{{{day}}}\
		</td>\
		{{/data}}\
		</tr>\
		{{/daysData}}\
		{{/month}}\
		</tbody>\
		</table>";
		if (this.tanggaldiklik === true ) {
			template = template+"<div align='right' id='mulaibtn' style='cursor: pointer;'><font size='2px'>Mulai</div>";
			template = template+"<div align='right' id='spasi' >======</div>";
			template = template+"<div align='right' id='berhentibtn' style='cursor: pointer;'>Berhenti</div>";
		}
		return Mustache.to_html(template, this);
		}
		
		var now = new Date();
		var cal = new Calendar(now.getFullYear(), now.getMonth(), now.getDate(), now.getDay());
		
 			//Untuk melakukan pengeblokan tangalan
			$('#ical-1').live("click", function() {
				cal.updatePilihanMulaiAwal(1);
				$('#icalendar').html(cal.renderCalendar());
			});
		
			$('#ical-2').live("click", function() {
				cal.updatePilihanMulaiAwal(2);
				$('#icalendar').html(cal.renderCalendar());
			});
		for (var aac = 3; aac <= 3; aac+=1) {
			$('#ical-'+aac).live("click", function() {
				cal.updatePilihanMulaiAwal(3);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var aad = 4; aad <= 4; aad+=1) {
			$('#ical-'+aad).live("click", function() {
				cal.updatePilihanMulaiAwal(4);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var aae = 5; aae <= 5; aae+=1) {
			$('#ical-'+aae).live("click", function() {
				cal.updatePilihanMulaiAwal(5);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var aaf = 6; aaf <= 6; aaf+=1) {
			$('#ical-'+aaf).live("click", function() {
				cal.updatePilihanMulaiAwal(6);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var aag = 7; aag <= 7; aag+=1) {
			$('#ical-'+aag).live("click", function() {
				cal.updatePilihanMulaiAwal(7);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var aah = 8; aah <= 8; aah+=1) {
			$('#ical-'+aah).live("click", function() {
				cal.updatePilihanMulaiAwal(8);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var aai = 9; aai <= 9; aai+=1) {
			$('#ical-'+aai).live("click", function() {
				cal.updatePilihanMulaiAwal(9);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var aaj = 10; aaj <= 10; aaj+=1) {
			$('#ical-'+aaj).live("click", function() {
				cal.updatePilihanMulaiAwal(10);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var aak = 11; aak <= 11; aak+=1) {
			$('#ical-'+aak).live("click", function() {
				cal.updatePilihanMulaiAwal(11);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var aal = 12; aal <= 12; aal+=1) {
			$('#ical-'+aal).live("click", function() {
				cal.updatePilihanMulaiAwal(12);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var aam = 13; aam <= 13; aam+=1) {
			$('#ical-'+aam).live("click", function() {
				cal.updatePilihanMulaiAwal(13);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var aan = 14; aan <= 14; aan+=1) {
			$('#ical-'+aan).live("click", function() {
				cal.updatePilihanMulaiAwal(14);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var aao = 15; aao <= 15; aao+=1) {
			$('#ical-'+aao).live("click", function() {
				cal.updatePilihanMulaiAwal(15);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var aap = 16; aap <= 16; aap+=1) {
			$('#ical-'+aap).live("click", function() {
				cal.updatePilihanMulaiAwal(16);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var aaq = 17; aaq <= 17; aaq+=1) {
			$('#ical-'+aaq).live("click", function() {
				cal.updatePilihanMulaiAwal(17);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var aar = 18; aar <= 18; aar+=1) {
			$('#ical-'+aar).live("click", function() {
				cal.updatePilihanMulaiAwal(18);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var aas = 19; aas <= 19; aas+=1) {
			$('#ical-'+aas).live("click", function() {
				cal.updatePilihanMulaiAwal(19);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var aat = 20; aat <= 20; aat+=1) {
			$('#ical-'+aat).live("click", function() {
				cal.updatePilihanMulaiAwal(20);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var aau = 21; aau <= 21; aau+=1) {
			$('#ical-'+aau).live("click", function() {
				cal.updatePilihanMulaiAwal(21);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var aav = 22; aav <= 22; aav+=1) {
			$('#ical-'+aav).live("click", function() {
				cal.updatePilihanMulaiAwal(22);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var aaw = 23; aaw <= 23; aaw+=1) {
			$('#ical-'+aaw).live("click", function() {
				cal.updatePilihanMulaiAwal(23);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var aax = 24; aax <= 24; aax+=1) {
			$('#ical-'+aax).live("click", function() {
				cal.updatePilihanMulaiAwal(24);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var aay = 25; aay <= 25; aay+=1) {
			$('#ical-'+aay).live("click", function() {
				cal.updatePilihanMulaiAwal(25);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var aaz = 26; aaz <= 26; aaz+=1) {
			$('#ical-'+aaz).live("click", function() {
				cal.updatePilihanMulaiAwal(26);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var aba = 27; aba <= 27; aba+=1) {
			$('#ical-'+aba).live("click", function() {
				cal.updatePilihanMulaiAwal(27);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var abb = 28; abb <= 28; abb+=1) {
			$('#ical-'+abb).live("click", function() {
				cal.updatePilihanMulaiAwal(28);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var abc = 29; abc <= 29; abc+=1) {
			$('#ical-'+abc).live("click", function() {
				cal.updatePilihanMulaiAwal(29);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var abd = 30; abd <= 30; abd+=1) {
			$('#ical-'+abd).live("click", function() {
				cal.updatePilihanMulaiAwal(30);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
		for (var abe = 31; abe <= 31; abe+=1) {
			$('#ical-'+abe).live("click", function() {
				cal.updatePilihanMulaiAwal(31);
				$('#icalendar').html(cal.renderCalendar());
			});
		}
	
		$('#mulaibtn').live("click", function() {
			cal.updatePilihanMulai();
			cal.updateMonth(cal.year, cal.month.monthIndex, cal.month.currentDay, cal.month.currentWeekdaysIndex);
			$('#icalendar').html(cal.renderCalendar());
		});
		$('#berhentibtn').live("click", function() {
			cal.updatePilihanBerhenti(cal.tanggalberhenti);
			cal.updateMonth(cal.year, cal.month.monthIndex, cal.month.currentDay, cal.month.currentWeekdaysIndex);
			$('#icalendar').html(cal.renderCalendar());
		});
		$('.ical-next').live("click", function() {
			cal.muatbulantahun(cal.month.monthIndex+1);
			cal.updateMonth(cal.year, cal.month.monthIndex+1, 1, cal.month.nextLastWeekdayIndex);
			alert(tanggalmulai+"--"+bulanmulai+"--"+tahunmulai);
			$('#icalendar').html(cal.renderCalendar());
		});
		
		$('.ical-prev').live("click", function() {
			cal.muatbulantahun(cal.month.monthIndex-1);
			cal.updateMonth(cal.year, cal.month.monthIndex-1, 1, cal.month.pastFirstWeekdayIndex);
			$('#icalendar').html(cal.renderCalendar());
		});
	
    return this.each(function() {
		// Do something to each item
		console.log(cal);
		$(this).html(cal.renderCalendar());
    });
  }
})(jQuery);





