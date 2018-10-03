import * as React from "react";

interface States {
  innerWidth: number;
  innerHeight: number;
}

abstract class ChartBase<TProps> extends React.Component<TProps, States> {
  protected chart: React.RefObject<HTMLDivElement>;

  state = {
    innerWidth: 0,
    innerHeight: 0
  };

  constructor(props) {
    super(props);
    this.chart = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize = () => {
    this.setState({
      innerWidth: this.chart.current ? this.chart.current.offsetWidth : 0,
      innerHeight: this.chart.current ? this.chart.current.offsetHeight : 0
    });
  };
}

export default ChartBase;
