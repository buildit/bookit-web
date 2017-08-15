import moment from 'moment'

export const mapInitialValues = values => ({
  id: values.id,
  title: values.title,
  start: values.start && moment(values.start).toDate(),
  end: values.end && moment(values.end).toDate(),
})

export const getSubmittableMeeting = (form, meeting) => {
  // FIXME: This is crazy-sauce. What is the right way?
  if (!form) return { values: {} }
  if (!form['meeting-form']) return { values: {} }
  if (!form['meeting-form'].values) return { values: {} }
  let submittableValues = form['meeting-form'].values
  submittableValues.id = meeting.id

  return submittableValues
}
