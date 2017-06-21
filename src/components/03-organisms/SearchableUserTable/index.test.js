import React from 'react'
import { shallow, mount } from 'enzyme'

import SearchableUserTable from '.'
import TeamSelector from './TeamSelector'
import UserTableRow from './UserTableRow'
import SearchBar from './SearchBar'

describe('<SearchableUserTable />', () => {
  const props = {
    users: [
      { name: 'Zac Smith',
        location: 'New York',
        email: '11@designit.com',
        team: 'WIPRO',
        active: true },
      { name: 'Scott Summers',
        location: 'New York',
        email: '12@designit.com',
        team: 'DESIGNIT',
        active: true },
      { name: 'Greg Pearman',
        location: 'New York',
        email: '15@designit.com',
        team: 'WIPRO',
        active: true },
      { name: 'Lawrence Lee',
        location: 'New York',
        email: '13@designit.com',
        team: 'DESIGNIT',
        active: true },
      { name: 'Larry Test',
        location: 'New York',
        email: '14@designit.com',
        team: 'DESIGNIT',
        active: true },
    ],
    onRemoveClick: jest.fn(),
  }

  it('renders', () => {
    const wrapper = shallow(<SearchableUserTable {...props} />)
    expect(wrapper).toBeTruthy()
  })

  it('filters by team', () => {
    const wrapper = mount(<SearchableUserTable {...props} />)
    const selectors = wrapper.find(TeamSelector).find('.teamSelector').find('span')
    selectors.last().simulate('click')
    const firstRowName = wrapper.find(UserTableRow).find('.userTableRow').find('td').first()
    expect(firstRowName.text()).toBe('Zac Smith')
  })

  it('changes the class on click', () => {
    const wrapper = mount(<SearchableUserTable {...props} />)
    const selectors = wrapper.find(TeamSelector).find('.teamSelector').find('span')
    selectors.last().simulate('click')
    expect(selectors.first().hasClass('selected')).toBeFalsy()
  })

  it('filters by first and/or last name as you type', () => {
    const wrapper = mount(<SearchableUserTable {...props} />)
    const input = wrapper.find(SearchBar).find('.searchBar').find('input')
    input.simulate('change', {target: {value: 'La'}})
    const firstRowName = wrapper.find(UserTableRow).find('.userTableRow').last().find('td').first()
    expect(firstRowName.text()).toBe('Larry Test')
  })

})
