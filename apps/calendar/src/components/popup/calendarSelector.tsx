import { h } from 'preact';

import { CalendarDropdownMenu } from '@src/components/popup/calendarDropdownMenu';
import { PopupSection } from '@src/components/popup/popupSection';
import { cls } from '@src/helpers/css';
import { useDropdownState } from '@src/hooks/common/useDropdownState';
import type { FormStateDispatcher } from '@src/hooks/popup/useFormState';
import { FormStateActionType } from '@src/hooks/popup/useFormState';

import type { CalendarInfo } from '@t/options';

interface Props {
  calendars: CalendarInfo[];
  selectedCalendarId?: string;
  formStateDispatch: FormStateDispatcher;
}

const classNames = {
  popupSection: ['dropdown-section', 'calendar-section'],
  popupSectionItem: cls('popup-section-item', 'popup-button'),
  dotIcon: cls('icon', 'dot'),
  content: cls('content', 'event-calendar'),
};

export function CalendarSelector({ calendars, selectedCalendarId, formStateDispatch }: Props) {
  const { isOpened, setOpened, toggleDropdown } = useDropdownState();

  const selectedCalendar = calendars.find((calendar) => calendar.id === selectedCalendarId);
  const { backgroundColor = '', name = '' } = selectedCalendar ?? {};
  var buttonStyle = {
    width: '402px',
    display: 'flex',
    alignItems: 'center' 
  };
  var nameStyle = {
    flexGrow: 1, 
  };

  const changeIndex = (index: number) =>
    formStateDispatch({ type: FormStateActionType.setCalendarId, calendarId: calendars[index].id });

  return (
    <PopupSection onClick={toggleDropdown} classNames={classNames.popupSection}>
      <button type="button" className={classNames.popupSectionItem} style={buttonStyle}>
        <span className={classNames.dotIcon} style={{ backgroundColor }}  />
        <span className={classNames.content} style={flex-grow}>{name}</span>
        <span className={cls('icon', 'ic-dropdown-arrow', { open: isOpened })} />
      </button>
      {isOpened && (
        <CalendarDropdownMenu
          calendars={calendars}
          setOpened={setOpened}
          onChangeIndex={changeIndex}
        />
      )}
    </PopupSection>
  );
}
