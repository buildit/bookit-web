import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'

const TeamSelector = ({ handleSelectTeamChange, teams, selectedTeam }) => (
  <div className={styles.teamSelector}>
    {teams.map(team => (
      <span
        key={team.id}
        onClick={() => { handleSelectTeamChange(team.id) }}
        className={team.id === selectedTeam ?
          styles.selected : styles.notSelected
        }
      >{team.name}</span>
    ))}
  </div>
)

export default TeamSelector

TeamSelector.propTypes = {
  handleSelectTeamChange: PropTypes.func.isRequired,
  teams: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  selectedTeam: PropTypes.string.isRequired,
}
