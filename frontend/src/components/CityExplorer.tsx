import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { INDIA_CITIES, INDIA_STATES, type IndiaCity } from "../data/siteContent";
import { ProductInterest } from "../types/enquiry";
import Icon from "./Icon";
import "./CityExplorer.css";

type ProductFilter = "all" | "society" | "education";

export default function CityExplorer() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [productFilter, setProductFilter] = useState<ProductFilter>("all");
  const [selectedCity, setSelectedCity] = useState<IndiaCity | null>(null);

  const filteredCities = useMemo(() => {
    return INDIA_CITIES.filter((city) => {
      const matchesSearch = city.name.toLowerCase().includes(search.trim().toLowerCase());
      const matchesState = stateFilter === "all" || city.state === stateFilter;
      return matchesSearch && matchesState;
    });
  }, [search, stateFilter]);

  const handleEnquire = (city: IndiaCity, product: ProductInterest) => {
    const productParam = product === ProductInterest.SocietyManagementSoftware ? "society" : "education";
    navigate(`/contact?product=${productParam}&city=${encodeURIComponent(city.name)}&demo=true`);
  };

  return (
    <div className="city-explorer">
      <div className="city-explorer-controls">
        <div className="city-search-wrap">
          <Icon name="search" size={18} />
          <input
            type="text"
            className="city-search-input"
            placeholder="Search for a city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search cities"
          />
        </div>

        <select
          className="form-select city-filter-select"
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          aria-label="Filter by state"
        >
          <option value="all">All States</option>
          {INDIA_STATES.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <select
          className="form-select city-filter-select"
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value as ProductFilter)}
          aria-label="Filter by product"
        >
          <option value="all">Both Products</option>
          <option value="society">Society Management</option>
          <option value="education">Education Management</option>
        </select>
      </div>

      <div className="city-explorer-body">
        <div className="city-list" role="listbox" aria-label="Cities">
          {filteredCities.length === 0 && (
            <p className="text-muted city-empty-state">No cities match your search.</p>
          )}
          {filteredCities.map((city) => (
            <button
              key={city.name}
              role="option"
              aria-selected={selectedCity?.name === city.name}
              className={`city-chip ${selectedCity?.name === city.name ? "is-selected" : ""}`}
              onClick={() => setSelectedCity(city)}
            >
              {city.name}
              <span className="city-chip-state">{city.state}</span>
            </button>
          ))}
        </div>

        <div className="city-detail">
          {!selectedCity && (
            <div className="city-detail-empty">
              <Icon name="building" size={32} />
              <p>Select a city to see how our solutions could support organizations there.</p>
            </div>
          )}

          {selectedCity && (
            <div className="city-detail-content">
              <h3>{selectedCity.name}, {selectedCity.state}</h3>
              <p className="text-muted">
                Example market for our society and education management solutions. This is an
                illustrative example of where our software could be implemented — not a
                confirmed deployment or active customer location.
              </p>

              <div className="city-detail-products">
                {(productFilter === "all" || productFilter === "society") && (
                  <div className="city-detail-product-card">
                    <h4>Society Management Software</h4>
                    <p className="text-muted">
                      Housing societies and cooperative communities in {selectedCity.name} can use
                      our software to manage residents, maintenance billing, complaints, and notices
                      in one place.
                    </p>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEnquire(selectedCity, ProductInterest.SocietyManagementSoftware)}
                    >
                      Enquire for {selectedCity.name}
                    </button>
                  </div>
                )}

                {(productFilter === "all" || productFilter === "education") && (
                  <div className="city-detail-product-card">
                    <h4>Education Management Software</h4>
                    <p className="text-muted">
                      Schools, colleges, and coaching institutes in {selectedCity.name} can use our
                      software to manage students, fees, attendance, and academic administration.
                    </p>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEnquire(selectedCity, ProductInterest.EducationManagementSoftware)}
                    >
                      Enquire for {selectedCity.name}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
