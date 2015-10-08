/**
 * Created by shi.pengyan on 2015-10-08.
 */

import React from 'react';

var Child = React.createClass({
  render: function () {
    return (
      <div>
        and this is the <b>{this.props.name}</b>.
      </div>
    );
  }
});

module.exports = Child;