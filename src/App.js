import "./styles.css";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tsv: `Name	Link	GUID	Keys	Capsules
JR 鴫野駅 Entrance	https//intel.ingress.com/?pll=34.692187,135.545972	415b8398932640aca029ccfbe542ef28.16	1	46788496
JR京橋駅 大阪環状線ホーム	https//intel.ingress.com/?pll=34.696693,135.533902	b80cb01e9a6d499da879346120e57899.16	1	46788496
JR大阪城公園駅	https//intel.ingress.com/?pll=34.68866,135.53434	b39b665f1368404090e19a6d2353636e.16	2	175502FE
JR放出駅	https//intel.ingress.com/?pll=34.687779,135.562864	d990a97f46f64c359f73d412fcdcb310.16	1	175502FE`,
      json: ""
    };
    this.handleTsvChange = this.handleTsvChange.bind(this);
    this.handleClickConvert = this.handleClickConvert.bind(this);
  }

  handleTsvChange(event) {
    this.setState({ tsv: event.target.value });
  }
  handleClickConvert(event) {
    this.setState({ json: this.reduceTsv(this.state.tsv) });
  }

  reduceTsv(state_tsv) {
    let tsv = state_tsv.split("\n");
    let t2 = {};
    for (let tline of tsv) {
      let t = tline.split("\t");
      if (t[0] === "Name") {
        continue;
      }
      //name,url,guid,keynum,capsule_id
      let latlng = t[1].replace("https//intel.ingress.com/?pll=", "");
      let key = "id_" + t[2]; //guid
      let label = t[0];
      t2[key] = {
        guid: t[2],
        latlng: latlng,
        label: label
      };
    }
    //
    let bkmk = {
      maps: {
        idOthers: {
          label: "Others",
          state: 1,
          bkmrk: {}
        }
      },
      portals: {
        idOthers: {
          label: "Others",
          state: 1,
          bkmrk: {}
        }
      }
    };
    bkmk.portals.idOthers.bkmrk = t2;
    return JSON.stringify(bkmk);
  }

  render = () => {
    return (
      <div className="App">
        <h1>
          Convert{" "}
          <a href="https://www.reddit.com/r/Ingress/comments/lgpvq6/iitc_plugin_to_show_core_inventory/">
            CORE subsc. inventory
          </a>{" "}
          to IITC bookmark json
        </h1>
        <h2>Paste Core inventory TSV here</h2>
        <textarea
          style={{ width: 100 + "%", height: 12 + "em" }}
          defaultValue={this.state.tsv}
          onChange={this.handleTsvChange}
        />
        <br />
        <button onClick={this.handleClickConvert}>Convert</button>
        <h2>IITC bookmark json</h2>
        <textarea
          style={{ width: 100 + "%", height: 12 + "em" }}
          value={this.state.json}
          readOnly
        />
        <br />
      </div>
    );
  };
}

export default App;
