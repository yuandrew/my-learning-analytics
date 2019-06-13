import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Popover from '@material-ui/core/Popover'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  card: {
    width: '100%'
  }
})

function SimpleCard (props) {
  const { classes, keyword, children } = props

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  return (
    <>
      <Card
        className={classes.card}
        onClick={event => setAnchorEl(event.currentTarget)}>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            {keyword}
          </Typography>
        </CardContent>
      </Card>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        {children}
      </Popover>
    </>
  )
}

export default withStyles(styles)(SimpleCard)