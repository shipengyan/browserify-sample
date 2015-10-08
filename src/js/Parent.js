/**
 * Created by shi.pengyan on 2015-10-08.
 */
import React from 'react';
import Child from './Child';


var Parent = React.createClass({
  render: function () {
    return (
      <div>
        <div> This is the parent.</div>
        <Child name="child"/>
      </div>
    )
  }
});

module.exports = Parent;