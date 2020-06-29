import React from "react";
import { t } from "ttag";

import Metrics from "metabase/entities/metrics";
import MetricItem from "metabase/admin/datamodel/components/database/MetricItem";

import Button from "metabase/components/Button";
import Link from "metabase/components/Link";
import { DatabaseSchemaAndTableDataSelector } from "metabase/query_builder/components/DataSelector";

import FilteredToUrlTable from "../hoc/FilteredToUrlTable";

@Metrics.loadList({ wrapped: true })
@FilteredToUrlTable("metrics")
class MetricListApp extends React.Component {
  render() {
    const { metrics, tableId, setTableId } = this.props;
    return (
      <div className="px3">
        <div className="flex py2">
          <DatabaseSchemaAndTableDataSelector
            selectedTableId={tableId}
            setSourceTableFn={setTableId}
          />
          <Link
            to={`/admin/datamodel/metric/create?table=${tableId}`}
            className="ml-auto"
          >
            <Button primary disabled={tableId == null}>{t`New metric`}</Button>
          </Link>
        </div>
        <table className="AdminTable">
          <thead className="text-bold">
            <tr>
              <th style={{ minWidth: "200px" }}>{t`Name`}</th>
              <th className="full">{t`Definition`}</th>
              <th>{t`Actions`}</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map(metric => (
              <MetricItem
                key={metric.id}
                onRetire={() => metric.setArchived(true)}
                metric={metric}
                // TODO - ideally we shouldn't need this
                tableMetadata={{}}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MetricListApp;