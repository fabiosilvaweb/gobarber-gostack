import { shade } from 'polished';
import styled from 'styled-components';
import ArrowLeftIcon from '../../assets/ArrowLeftIcon.svg'; 
import ArrowRightIcon from '../../assets/ArrowRightIcon.svg';

export const Container = styled.div`

`;

export const Header = styled.header`
  background: var(--input);
  padding: 32px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  max-width: 1120px;
  margin: 0 auto;
  padding: 0 16px;

  > img {
    height: 80px;
    margin-right: 80px;
  }

  > button {
    margin-left: auto;
    background: transparent;
    color: var(--text);
  }
`;

export const Profile = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
  grid-column-gap: 16px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  > div {
    display: flex;
    flex-direction: column;

    span {
      color: var(--text);
      font-size: 14px;
    }

    strong {
      color: var(--primary);
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  padding: 0 16px;

  display: flex;

  @media (max-width: 800px) {
    flex-direction: column;
  }

`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  @media (max-width: 800px) {
    width: 100%;
  }

  h1 { 
    font-size: 36px;
    color: var(--white);
  }

  p {
    margin-top: 8px;
    color: var(--primary);

    span + span::before {
      content: '|';
      margin: 0 8px;
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: var(--text);
    font-weight: 400;
  }

  > div {
    display: flex;
    background: var(--shape);
    align-items: center;
    padding: 16px 24px;
    border-radius: 6px;
    margin-top: 24px;
    position : relative;

    &::before {
      content: '';

      position: absolute;
      width: 2px;
      height: 80%;
      background: var(--primary);
      left: 0;
      top: 10%;
    }

    > img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: var(--text);

      svg {
        color: var(--primary);
        margin-right: 8px;
      }

    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;
  > strong {
    color: var(--text);
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid var(--shape);
    display: block;
    padding-bottom: 8px;
    margin-bottom: 16px;
  }
`;

export const Appointment = styled.div`

  display: flex;
  align-items: center;
  margin-top: 24px;

  span {
    margin-left: auto;
    margin-right: 16px;
    display: flex;
    align-items: center;
    color: var(--white);
    width: 70px;

    svg {
      color: var(--primary);
      margin-right: 8px;
    }

  }

  > div {
    flex: 1;
    display: flex;
    background: var(--shape);
    align-items: center;
    padding: 16px 24px;
    border-radius: 6px;

    > img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
    }
  }

`;

export const Calendar = styled.aside`
  width: 380px;

  @media (max-width: 800px) {
    width: 100%;
    flex: 1;
    margin-top: 24px;

    .DayPicker {
      width: 100%;
    }

  }

  .DayPicker {
  border-radius: 10px;

  .DayPicker-Day--today {
    background: var(--primary);
  }

  &-wrapper {
    padding-bottom: 0;
    background: #28262e;
    border-radius: 10px;
    z-index: 0;
  }

  &-NavBar {
    position: relative;

    ::before {
      content: '';
      width: 100%;
      height: 50px;
      position: absolute;
      background: #3e3b47;
      border-radius: 10px 10px 0 0;
      z-index: -1;
    }
  }

  &-NavButton {
    color: #999591 !important;
    margin-top: 0;
    top: 0;

    &--prev {
      background: url(${ArrowLeftIcon}) no-repeat center;
      margin-right: 0;
      left: 12px;
      width: 50px;
      height: 50px;
    }

    &--next {
      background: url(${ArrowRightIcon}) no-repeat center;
      right: 12px;
      width: 50px;
      height: 50px;
    }
  }

  &-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 0;
    padding: 0 10px 10px;
  }

  &-Caption {
    line-height: 50px;
    color: #f4ede8;

    > div {
      text-align: center;
    }
  }

  &-Weekday {
    color: #666360;
    font-size: 16px;
  }

  &-Day {
    width: 40px;
    height: 40px;
    transition: all 0.2s ease;
    border-radius: 10px;

    &--today {
      font-weight: normal;
      color: #fff;
    }

    &--available:not(.DayPicker-Day--outside) {
      background: #3e3b47;
      border-radius: 10px;
    }

    &--disabled {
      color: #666360;
      background: transparent !important;
    }

    &--selected:not(.DayPicker-Day--disabled) {
      background: #ff9000 !important;
      color: #232129 !important;
    }
  }

  &:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }
}
`;
