<template>
  <div class="fm-calendar">
    <nav class="fm-calendar__nav">
      <div class="fm-calendar__title">
        <strong>{{months[month]}}</strong>
        <strong>{{year}}</strong>
      </div>
      <div class="fm-calendar__nav--prev">
        <a href="javascript:void(0);" class="c-arrow--left" @click="prev"></a>
      </div>
      <div class="fm-calendar__nav--current">
        <a href="javascript:void(0);" class="c-circle" @click="current"></a>
      </div>
      <div class="fm-calendar__nav--next">
        <a href="javascript:void(0);" class="c-arrow--right" @click="next"></a>
      </div>
    </nav>
    <table class="fm-calendar__picker">
      <thead v-if="false">
        <tr>
          <th><abbr title="Sunday">Sun</abbr></th>
          <th><abbr title="Monday">Mon</abbr></th>
          <th><abbr title="Tuesday">Tue</abbr></th>
          <th><abbr title="Wednesday">Wed</abbr></th>
          <th><abbr title="Thursday">Thu</abbr></th>
          <th><abbr title="Friday">Fri</abbr></th>
          <th><abbr title="Saturday">Sat</abbr></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in generateWeeks()">
          <td v-for="day in week">
            <button
              :class="{
                'fm-calendar_date--disabled': !inCurrentMonth(day),
                'fm-calendar_date': true,
                'fm-calendar_date--selected': isToday(day)
              }"
            >{{day.getDate()}}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  const i18n = {
    months: ['January','February','March','April','May','June','July','August','September','October','November','December']
  }
  export default {
    name: 'FmCalendar',
    data() {
      return {
        currentDate: this.date
      }
    },
    props: {
      date: {
        type: Date,
        default() {
          return new Date()
        }
      },
      months: {
        type: Array,
        default: i18n.months
      }
    },
    computed: {
      firstDay() {
        return new Date(this.year, this.month, 1)
      },
      year() {
        return this.currentDate.getFullYear()
      },
      month() {
        return this.currentDate.getMonth()
      },
      day() {
        return this.currentDate.getDate()
      }
    },
    methods: {
      isToday(date) {
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDate()
        return this.date.getFullYear() == year && this.date.getMonth() == month && this.date.getDate() == day
      },
      inCurrentMonth(date) {
        const year = date.getFullYear()
        const month = date.getMonth()
        return this.year == year && this.month == month
      },
      generateWeeks() {
        let days = []
        const offset = this.firstDay.getDay()
        for (let i = 1; i <= 42; i++) {
          let date = new Date(this.year, this.month, i - offset)
          days.push(date)
        }
        const weeks = days.reduce((acc, day, index) => {
          acc[Math.floor(index / 7)].push(day)
          return acc
        }, Array.from({length: 7}, () => []))
        return weeks
      },
      prev() {
        this.currentDate = new Date(this.year, this.month - 1, this.day)
      },
      current() {

      },
      next() {
        this.currentDate = new Date(this.year, this.month + 1, this.day)
      }
    }
  }
</script>
<style>
  .fm-calendar {
    display: inline-block;
    border: 1px solid rgba(37, 40, 43, 0.1);
    box-shadow: 0 1px 2px rgba(37, 40, 43, 0.1);
    padding: 8px;
    box-sizing: border-box;

    & table {
      border-collapse: collapse;
      margin-bottom: 20px;

      & td {
        padding: 0;
      }
    }
  }

  .fm-calendar__nav {
    display: flex;
    margin-bottom: 10px;

    & .fm-calendar__title {
      flex: 6
    }

    & > .fm-calendar__nav--prev,
    & > .fm-calendar__nav--current,
    & > .fm-calendar__nav--next {
      flex: 1
    }

    & > .fm-calendar__nav--prev {
      text-align: left;
    }

    & > .fm-calendar__nav--next {
      text-align: right;
    }
  }

  .fm-calendar_date {
    box-sizing: border-box;
    padding: 4px 8px;
    width: 32px;
    text-align: center;
    border: 1px solid #f7f9fa;
    background-color: white;
    cursor: pointer;
    appearance: none;
    outline: none;

    &:hover {
      background-color: #f4faff;
    }
  }

  .fm-calendar_date--disabled {
    color: #d0d4d9;
    background-color: #f7f9fa;
    cursor: default;
  }

  .fm-calendar_date--selected {
    color: white;
    background-color: #007ee5;
  }
</style>