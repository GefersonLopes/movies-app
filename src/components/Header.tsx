import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import Select, { GroupBase, MultiValue } from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiSearch } from 'react-icons/fi';
import { GiSettingsKnobs } from 'react-icons/gi';

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(2)};
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacing(3)};

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const SearchBar = styled.input`
  border-radius: ${(props) => props.theme.spacing(5)};
  position: absolute;
  left: 55px;
  border: none;
  outline: none;
  background-color: transparent;
  color: ${(props) => props.theme.colors.text};
  width: 60%;
  height: 80%;
`;

const ContainerInput = styled.div`
  position: relative;
  background-color: #191919;
  border-radius: ${(props) => props.theme.spacing(5)};
  max-width: 317px;
  width: 75%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const FilterIcon = styled(GiSettingsKnobs)`
  color: ${(props) => props.theme.colors.text};
  width: 48px;
  height: 48px;
  padding: ${(props) => props.theme.spacing(1.5)};
  background-color: #232323;
  border-radius: 50%;
  transform: rotate(90deg);
`;

const SearchIcon = styled(FiSearch)`
  color: ${(props) => props.theme.colors.text};
  width: 40px;
  height: 40px;
  padding: ${(props) => props.theme.spacing(1)};
  background-color: #232323;
  border-radius: 50%;
  position: absolute;
  left: 5px;
`;

const SectionInput = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing(1)};
  position: relative;
`;

const DropdownContainer = styled.div`
  background-color: ${(props) => props.theme.colors.cardBackground};
  border-radius: ${(props) => props.theme.spacing(1)};
  padding: ${(props) => props.theme.spacing(2)};
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 10;
`;

const FilterTitle = styled.h4`
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing(1)};
`;

const DateRangeContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(1)};
  align-items: center;
`;

const genresOptions: { value: string; label: string }[] = [
  { value: 'action', label: 'Ação' },
  { value: 'adventure', label: 'Aventura' },
  { value: 'comedy', label: 'Comédia' },
  { value: 'drama', label: 'Drama' },
  { value: 'romance', label: 'Romance' },
  { value: 'thriller', label: 'Terror' },
  { value: 'sci-fi', label: 'Ficção Científica' },
];

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<
    MultiValue<{ value: string; label: string }>
  >([]);
  const [startDate, setStartDate] = useState<Date | null | undefined>(
    new Date(),
  );
  const [endDate, setEndDate] = useState<Date | null | undefined>(new Date());
  const [showFilters, setShowFilters] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowFilters(false);
    }
  };

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setShowFilters(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <HeaderContainer>
      <img
        src={logo}
        alt="logo"
        onClick={() => (window.location.href = '/')}
        style={{ cursor: 'pointer' }}
      />
      <SectionInput>
        <ContainerInput>
          <SearchIcon />
          <SearchBar
            placeholder="Pesquisar..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </ContainerInput>
        <FilterIcon onClick={() => setShowFilters(!showFilters)} />
        {showFilters && (
          <DropdownContainer ref={dropdownRef}>
            <FilterTitle>Gêneros cinematográficos</FilterTitle>
            <Select<
              { value: string; label: string },
              true,
              GroupBase<{ value: string; label: string }>
            >
              isMulti
              options={genresOptions}
              value={selectedGenres}
              onChange={setSelectedGenres}
              placeholder="Selecionar gêneros"
              styles={{
                control: (base) => ({
                  ...base,
                }),
                menu: (base) => ({
                  ...base,
                }),
              }}
            />

            <FilterTitle>Data de lançamento</FilterTitle>
            <DateRangeContainer>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate || undefined}
                endDate={endDate || undefined}
                placeholderText="De"
                dateFormat="dd/MM/yyyy"
                customInput={<SearchBar placeholder="De" />}
              />
              <span>a</span>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate || undefined}
                endDate={endDate || undefined}
                minDate={startDate || undefined}
                placeholderText="Até"
                dateFormat="dd/MM/yyyy"
                customInput={<SearchBar placeholder="Até" />}
              />
            </DateRangeContainer>
          </DropdownContainer>
        )}
      </SectionInput>
    </HeaderContainer>
  );
};
