const WIDTH = 82

// we are subtracting 3 from the final calculated width so that the
// meeting does not overlap the hour markers on the timeline
const calculateWidth = duration => (WIDTH * duration) - 3

export default calculateWidth
