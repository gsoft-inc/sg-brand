import "./PackagesTable.css";

import { ExternalLink, Table } from "@stories/components";
import { arrayOf, element, oneOfType, shape, string } from "prop-types";
import { components } from "@storybook/components";

const Img = components.img;

const propTypes = {
    packages: arrayOf(shape({
        name: string.isRequired,
        description: oneOfType([string, element]).isRequired,
        relativePath: string.isRequired
    }))
};

function renderVersion(name) {
    return (
        <ExternalLink href={`https://www.npmjs.com/package/${name}`}>
            <Img src={`https://img.shields.io/npm/v/${name}.svg?maxAge=3600`} alt="npm"></Img>
        </ExternalLink>
    );
}

function renderDependencies(relativePath) {
    return (
        <ExternalLink href={`https://david-dm.org/gsoft-inc/sg-orbit.svg?path=${relativePath}`}>
            <Img src={`https://img.shields.io/david/gsoft-inc/sg-orbit.svg?path=${relativePath}`} alt="Dependency Status"></Img>
        </ExternalLink>
    );
}

function toRowValues({ name, description, relativePath }) {
    return [
        <><span className="fw5">{name}</span><br />{description}</>,
        renderVersion(name),
        renderDependencies(relativePath)
    ];
}

export function PackagesTable({ packages }) {
    return (
        <Table
            columns={[
                "Package",
                { title: "Version", headerClassName: "o-ui-sb-packages-table-version" },
                { title: "Dependencies", headerClassName: "o-ui-sb-packages-table-dependencies" }
            ]}
            rows={packages.map(x => toRowValues(x))}
            fluid
        />
    );
}

PackagesTable.propTypes = propTypes;
