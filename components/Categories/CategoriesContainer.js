import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'

import CategoryItem from './CategoryItem'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}))

export default ({ categories = [] }) => {
  const classes = useStyles()
  return (
    <List className={classes.root}>
      {categories.map((category, index) => {
        return (
          <>
            <CategoryItem key={category.id} category={category} />
            {index + 1 < categories.length &&
              <Divider variant="inset" component="li" />}
          </>
        )
      })}
    </List>
  )
}
